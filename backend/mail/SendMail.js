import { createTransport } from "nodemailer";
import { resetPasswordEmail, verification } from "../constant.js";
import dotenv from "dotenv";
dotenv.config();

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: `"SKILL HUB" ${process.env.EMAIL_USER}`,
      to,
      subject,
      text,
      html,
    });

    console.log(`Email sent to ${to} with subject "${subject}"`);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};

export const puchasedCourseVerified = async (user, course) => {
  try {
    const html = verification(user, course);
    await transporter.sendMail({
      from: `"SKILL HUB" ${process.env.EMAIL_USER}`,
      to: user.email,
      subject: "Course Purchase",
      html,
    });
    console.log("✅ Purchase confirmation email sent.");
  } catch (error) {
    console.error("❌ failed:", error.message);
    throw error;
  }
};

export const sendResetPasswordEmail = async (to, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
  const html = resetPasswordEmail(resetUrl);
  await transporter.sendMail({
    from: `"SKILL HUB" ${process.env.EMAIL_USER}`,
    to,
    subject: "Reset Your Password",
    html,
  });
};

export const sendOTPEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `"SKILL HUB" ${process.env.EMAIL_USER}`,
    to: toEmail,
    subject: "Verify your email - OTP Code",
    text: `Your OTP code to verify your email is: ${otp}. It will expire in 10 minutes.`,
    html: `<p>Your OTP code to verify your email is: <b>${otp}</b></p><p>This OTP will expire in 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
