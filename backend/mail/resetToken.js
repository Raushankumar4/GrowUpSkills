import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateResetToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "10m" });
};

export const verifyResetToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
