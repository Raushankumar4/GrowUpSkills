import { instance } from "../index.js";
import crypto from "crypto";

export const paymentProcess = async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
  }
};

export const getRazorpaykeyforFrontend = async (_, res) => {
  try {
    res.status(200).json({
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    return res.redirect(
      `${process.env.END}/paymentSuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
