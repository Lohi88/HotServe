import express from "express"
import authMiddleware from "../middelware/auth.js"
import {placeOrder,verifyOrder} from "../controlers/orderController.js"

const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
export default orderRouter