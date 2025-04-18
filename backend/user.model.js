import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    loginOption: {
      type: String,
      enum: ["enrollement", "studentID"],
    },
    enrollement: {
      type: String,
      required: true,
    },
    studentID: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    purchasedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
