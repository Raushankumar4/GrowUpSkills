import mongoose from "mongoose";

const LateFeeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  session: String,
  feeHead: { type: mongoose.Schema.Types.ObjectId, ref: "FeeHead" },
  amount: Number,
  days: Number,
  fromDate: Date,
  toDate: Date,
  remark: String,
  isPaid: Boolean
}, { timestamps: true });

export default mongoose.model("LateFee", LateFeeSchema);
