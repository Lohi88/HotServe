import userModel from "../models/userModel.js";

// Add to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;
   
    if (!itemId || typeof itemId !== "string" || itemId.trim() === "" || itemId === "undefined") {
      return res.json({ success: false, message: "Invalid itemId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = { ...(userData.cartData || {}) };
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { $set: { cartData } });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error("❌ addToCart error:", error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    if (!itemId || typeof itemId !== "string" || itemId.trim() === "") {
      return res.json({ success: false, message: "Invalid itemId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = { ...(userData.cartData || {}) };

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
      await userModel.findByIdAndUpdate(userId, { cartData });
    }

    res.json({ success: true, message:"remove from cart" ,cartData});
  } catch (error) {
    console.error("❌ removeFromCart error:", error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.error("❌ getCart error:", error);
    res.json({ success: false, message: "Error fetching cart" });
  }
};

export { addToCart, removeFromCart, getCart };
