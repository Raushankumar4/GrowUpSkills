import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  rollNumber: String,
  class: String,
  section: String,
  admissionYear: String,
  phone: String,
  parentName: String
}, { timestamps: true });

export default mongoose.model("Student", StudentSchema);
