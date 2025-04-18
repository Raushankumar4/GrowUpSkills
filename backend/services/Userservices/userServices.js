import bcrypt from "bcrypt";
import User from "../../user.model.js";
import { generateToken } from "../../generateToken.js";

const registerUser = async ({
  username,
  email,
  password,
  loginOption,
  enrollement,
  studentID,
  dob,
}) => {
  if (
    !username ||
    !email ||
    !password ||
    !loginOption ||
    !enrollement ||
    !studentID ||
    !dob
  ) {
    throw new Error("All fields are required!");
  }
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error(
      "Email or username already exists! Please use a different one."
    );
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
    loginOption,
    enrollement,
    studentID,
    dob,
  });
  if (!newUser) {
    throw new Error("Something went wrong during registration!");
  }

  return { message: "Registered Successfully!" };
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields are required!");
  }
  let user;
  user = await User.findOne({ email });
  if (!user) {
    throw new Error("User Not Found!");
  }
  const comparedPassword = await bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    throw new Error("Wrong Password!");
  }
  user = await User.findOne({ email }).select("-password");

  return { message: "Login Sucessfully !", user };
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
  registerUser,
  loginUser,
  getProfile,
  loginWithEnrollmentOrStudentID,
};
