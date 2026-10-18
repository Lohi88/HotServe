import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRoute.js'

// app config
const app = express();
const port = 4000;

// middleware

app.use(cors());
app.use(express.json());~

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/uploads", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

// routes
app.get("/", (req, res) => {
  res.send("API Working");
});

// start server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
