import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import paymentRoutes from "./paymentroutes.js";
import { db } from "./db.js";
import { errorMiddleware } from "./error.js";
import cookieParser from "cookie-parser";
import userRoute from "./userRoute.js";
import Razorpay from "razorpay";
import path from 'path'
import streamRoute from "./routes/streamRoutes.js"

dotenv.config();

const app = express();
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
    methods: ["GET", "POST"],
  })
);
app.use(cookieParser());

// Routes
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", userRoute);
app.use("/", streamRoute);

app.get("/", (req, res) => {
  res.send("Stripe Payment Server is Running...");
});

const PORT = process.env.PORT || 5000;

app.use(errorMiddleware);

db().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
