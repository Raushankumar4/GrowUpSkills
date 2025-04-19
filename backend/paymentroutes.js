import express from "express";
import { buyCourse, confirmPayment } from "./paymentController.js";
import {
  getRazorpaykeyforFrontend,
  paymentProcess,
  paymentVerification,
} from "./razorpay/razorpay.js";

const router = express.Router();

// Route to create a payment intent
router.post("/buy-course", buyCourse);

// Route to confirm payment and update user data
router.post("/confirm-payment", confirmPayment);
// RazorPay
router.post("/razorpay", paymentProcess);
router.get("/razorpaykey", getRazorpaykeyforFrontend);
router.route("/paymentVerification").post(paymentVerification)

export default router;
