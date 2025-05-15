import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  razorpay_order_id: { type: String },
  razorpay_payment_id: { type: String },
  razorpay_signature: { type: String },

  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },

  amount: { type: Number },

  purchaseConfirmedAt: { type: Date },
  courseTitleSnapshot: { type: String },

  createdAt: { type: Date, default: Date.now },
});

export const Payment = mongoose.model("Payment", paymentSchema);
