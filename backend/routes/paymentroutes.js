import express from "express";
import {
  getPaymentReceipt,
  getRazorpaykeyforFrontend,
  paymentProcess,
  paymentVerification,
} from "../controller/PaymentController.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  alllPaymentHistory,
  getallPaymentHistory,
  getUserPayments,
} from "../controller/AdminController.js";

const router = express.Router();

// RazorPay
router.post("/razorpay", paymentProcess);
router.get("/razorpaykey", getRazorpaykeyforFrontend);
router.route("/paymentVerification").post(paymentVerification);
router.route("/purchase").get(isAuthenticated, getUserPayments);
router.route("/all-purchase").get(isAuthenticated, getallPaymentHistory);
router.route("/receipt/:paymentId").get(isAuthenticated, getPaymentReceipt);
router.route("/paymentHistory").get(isAuthenticated,alllPaymentHistory)

export default router;
