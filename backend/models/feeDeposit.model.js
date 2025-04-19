import mongoose from "mongoose";

const FeeDepositSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  feeHeadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeeHead",
    required: true
  },
  session: {
    type: String, 
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paidAmount: {
    type: Number,
    required: true
  },
  balanceAmount: {
    type: Number,
    default: function () {
      return this.totalAmount - this.paidAmount;
    }
  },
  depositDate: {
    type: Date,
    required: true
  },
  isPartial: {
    type: Boolean,
    default: false
  },
  paymentMethod: String, 
  remarks: String
}, { timestamps: true });

export default mongoose.model("FeeDeposit", FeeDepositSchema);
