import bcrypt from "bcryptjs";
import User from "../../models/user.model.js";
import { generateToken } from "../../utils/generateToken.js";

const loginUser = async ({ email, password }, res) => {
  if (!email || !password) {
    throw new Error("All fields are required!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User Not Found!");
  }

  if (user.authType === "google" && user.password === "google-oauth") {
    throw new Error("Please login using Google Sign-In.");
  }

  const comparedPassword = bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    throw new Error("Wrong Password!");
  }

  const token = generateToken(res, user);
  return { message: "Login Successfully!", token, authType: user.authType };
};

const loginWithEnrollmentOrStudentID = async (
  { enrollement, studentID, dob, loginOption },
  res
) => {
  let user;
  if (loginOption === "enrollement") {
    user = await User.findOne({ enrollement });
  } else if (loginOption === "studentID") {
    user = await User.findOne({ studentID });
  } else {
    throw new Error("No User Found !");
  }

  // Format stored DOB (from MongoDB) to YYYY-MM-DD
  const userDob = user.dob.toISOString().split("T")[0];

  // Normalize provided DOB (ensure it's in YYYY-MM-DD format)
  const formattedDob = new Date(dob).toISOString().split("T")[0];

  if (formattedDob !== userDob) {
    throw new Error("DOB is incorrect!");
  }

  const token = generateToken(res, user);

  return { message: "Logged in...", token };
};

const getProfile = async (req) => {
  const user = await User.findById(req.user).select("-password");
  if (!user) {
    throw new Error("User Not Found");
  }
  return { user };
};

export default {
  loginUser,
  getProfile,
  loginWithEnrollmentOrStudentID,
};
