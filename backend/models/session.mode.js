import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  name: String, // e.g., "2024-2025"
  startDate: Date,
  endDate: Date,
  isActive: Boolean
});

export default mongoose.model("Session", SessionSchema);
