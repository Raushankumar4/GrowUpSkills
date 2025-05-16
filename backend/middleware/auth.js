import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    req.user = user;

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(500).json({ message: "Server error during role check." });
  }
};

export const isLocalLogin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user || user.authType !== "local") {
      return res
        .status(403)
        .json({ message: "Only Local Login Gets This Access." });
    }
    next();
  } catch (error) {
    console.error("Local login check error:", error);
    res
      .status(500)
      .json({ message: "Server error while verifying login type." });
  }
};
