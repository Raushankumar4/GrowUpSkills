import mongoose from "mongoose";

const FeeHeadSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Tuition Fee', 'Hostel Fee', 'Bus Fee'],
    required: true
  },
  description: String,
  type: {
    type: String,
    enum: ['Regular', 'Optional'],
    default: 'Regular'
  }
}, { timestamps: true });

export default mongoose.model("FeeHead", FeeHeadSchema);
