import express from "express";
import {
  getRazorpaykeyforFrontend,
  paymentProcess,
  paymentVerification,
} from "../controller/PaymentController.js";
import { isAuthenticated } from "../middleware/auth.js";
import { getUserPayments } from "../controller/AdminController.js";

const router = express.Router();

// RazorPay
router.post("/razorpay", paymentProcess);
router.get("/razorpaykey", getRazorpaykeyforFrontend);
router.route("/paymentVerification").post(paymentVerification);
router.route("/purchase").get(isAuthenticated, getUserPayments);

export default router;
