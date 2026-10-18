import express from "express";
import { addToCart, removeFromCart, getCart } from "../controlers/cartController.js"; // ✅ use existing folder name
import authMiddleware from "../middelware/auth.js"; // ✅ same here, match your folder spelling

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
