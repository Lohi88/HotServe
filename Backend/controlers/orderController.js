import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// ✅ Place order handler
const placeOrder = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId; // From token via middleware

    // Calculate total amount
    const itemTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryCharge = 2;
    const totalAmount = (itemTotal + deliveryCharge) * 100; // in paise

    // Save order in DB
    const newOrder = new orderModel({
      userId,
      items,
      amount: totalAmount / 100,
      address,
      status: "pending",
      payment: false
    });
    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID.trim(),
      key_secret: process.env.RAZORPAY_KEY_SECRET.trim()
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount,
      currency: "INR",
      receipt: newOrder._id.toString(),
      payment_capture: 1
    });

    res.json({
      success: true,
      orderId: newOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error("Order placement error:", error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// ✅ Verify payment handler
const verifyOrder = async (req, res) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Generate signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET.trim())
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Update order as paid
      await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "paid" });
      return res.json({ success: true, message: "Payment verified & order updated" });
    } else {
      // Invalid signature
      await orderModel.findByIdAndUpdate(orderId, { payment: false, status: "failed" });
      return res.json({ success: false, message: "Payment verification failed" });
    }

  } catch (error) {
    console.error("Payment verification error:", error.message);
    res.json({ success: false, message: "Error verifying payment" });
  }
};

export { placeOrder, verifyOrder };
