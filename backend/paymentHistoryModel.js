import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payments: [
      {
        month: {
          type: String,
          required: true,
        },
        year: {
          type: Number,
          required: true,
        },
        paid: {
          type: Boolean, 
          required: true,
        },
        amountPaid: {
          type: Number, 
          required: false, 
        },
      },
    ],
  },
  { timestamps: true }
);

export const PaymentHistory = mongoose.model(
  "PaymentHistory",
  paymentHistorySchema
);
