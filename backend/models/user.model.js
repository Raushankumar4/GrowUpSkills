import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    googleId: { type: String, unique: true, sparse: true },
    photo: { type: String },
    authType: { type: String, enum: ["local", "google"], default: "local" },
    accessToken: { type: String },
    refreshToken: { type: String },
    displayName: { type: String },
    resetToken: String,
    resetTokenExpiry: Date,
    otp: String,
    otpExpiry: Date,
    isVerifiedEmail: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarPublicId: {
      type: String,
    },
    password: {
      type: String,
      required: function () {
        return this.authType === "local";
      },
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    bio: {
      type: String,
    },
    college: {
      type: String,
    },
    loginOption: {
      type: String,
      enum: ["enrollement", "studentID"],
      required: false,
    },
    enrollement: {
      type: String,
      required: false,
    },
    studentID: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    role: {
      type: String,
      enum: ["Student", "Admin"],
      default: "Student",
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
