import jwt from "jsonwebtoken";

export const generateToken = (res, user) => {
  try {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Store token in an HTTP-only, Secure cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript access (XSS protection)
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
