import userService from "../services/Userservices/userServices.js";
import { sendEmail, sendResetPasswordEmail } from "../mail/SendMail.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { generateResetToken, verifyResetToken } from "../mail/resetToken.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { handleResponse } from "../utils/handleResponse.js";
dotenv.config();

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      authType: "local",
    });
    generateToken(res, newUser);

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const response = await userService.loginUser(req.body, res);
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

export const UpdateProfile = async (req, res) => {
  try {
    const { username, bio, college, gender, mobile, dob } = req.body;
    const userId = req.user;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User Not Found!");
    }
    if (user.avatarPublicId && req.file) {
      await cloudinary.v2.uploader.destroy(user.avatarPublicId);
    }
    let avatar = user.avatar || null;
    let avatarPublicId = user.avatarPublicId || null;
    if (req.file) {
      avatar = req.file.path;
      avatarPublicId = req.file.filename;
    }

    const upadateUserProfie = await User.findByIdAndUpdate(
      userId,
      {
        username,
        bio,
        college,
        gender,
        mobile,
        avatar,
        avatarPublicId,
        dob,
      },
      { new: true }
    );
    return handleResponse(res, 200, "Profile Updated !", upadateUserProfie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const contactUs = async (req, res) => {
  const { fromEmail, subject, message } = req.body;

  const text = `
You received a new message.

From: ${fromEmail}
Subject: ${subject}

Message:
${message}
  `;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4CAF50;">New Contact Form Submission</h2>
      <p><strong>From:</strong> ${fromEmail}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #4CAF50;">
        ${message.replace(/\n/g, "<br>")}
      </div>
    </div>
  `;

  try {
    await sendEmail(process.env.EMAIL_USER, subject, text, html);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Contact form email failed:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = generateResetToken(user._id);

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendResetPasswordEmail(user.email, token);

    res.json({ message: "Reset link sent to your email." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = verifyResetToken(token);

    const user = await User.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Token is invalid or expired", error: err.message });
  }
};
