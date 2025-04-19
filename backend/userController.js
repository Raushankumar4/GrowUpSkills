import userService from "./services/Userservices/userServices.js";

export const registerUser = async (req, res) => {
  try {
    const response = await userService.registerUser(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const response = await userService.loginUser(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const loginWithEnrollmentOrStudentID = async (req, res) => {
  try {
    const response = await userService.loginWithEnrollmentOrStudentID(
      req.body,
      res
    );
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const logout = (_, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

export const getProfile = async (req, res) => {
  try {
    const response = await userService.getProfile(req);
    return res.status(201).json(response);
  } catch (error) {
    const statusCode = error.status || 400;
    return res.status(statusCode).json({ message: error.message });
  }
};
