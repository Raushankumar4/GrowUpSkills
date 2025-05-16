import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import path from "path";
import Razorpay from "razorpay";

dotenv.config();

import { db } from "./db/db.js";
import paymentRoutes from "./routes/paymentroutes.js";
import userRoute from "./routes/userRoute.js";
import streamRoute from "./routes/streamRoutes.js";
import "./config/passport.js";
import authRoutes from "./routes/authroutes.js";

const app = express();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", userRoute);
app.use("/", streamRoute);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
db().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.send("Running!");
});

export default app;
