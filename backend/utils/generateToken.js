import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (res, user) => {
  try {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "4d" }
    );

    // Store token in an HTTP-only, Secure cookie
    res.cookie("token", token, {
      httpOnly: false, // Prevents client-side JavaScript access (XSS protection)
      secure: false,
      sameSite: "strict", // Prevents CSRF attacks
      path: "/", // Root path
      maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
