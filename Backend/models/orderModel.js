import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },

  items: { type: Array, required: true }, // array of cart items

  amount: { type: Number, required: true },

  address: { type: Object, required: true }, // delivery address

  status: { type: String, default: "Food Processing" },

  date: { type: Date, default: Date.now },

  payment: { type: Boolean, default: false },

  // ✅ NEW: Razorpay payment tracking fields
  razorpayOrderId: { type: String }, // set when creating Razorpay order
  razorpayPaymentId: { type: String }, // set when payment is successful
  razorpaySignature: { type: String }, // for verification (optional)
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
