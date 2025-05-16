import { Payment } from "../models/PaymentSchema.js";
import User from "../models/user.model.js";
import { instance } from "../index.js";
import crypto from "crypto";
import { puchasedCourseVerified } from "../mail/SendMail.js";

export const paymentProcess = async (req, res) => {
  try {
    const { amount, courseId, userId } = req.body;
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    await Payment.create({
      user: userId,
      course: courseId,
      amount,
      razorpay_order_id: order.id,
      status: "pending",
    });

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Payment creation failed" });
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

  const payment = await Payment.findOne({ razorpay_order_id }).populate(
    "user course"
  );

  if (!payment) {
    return res
      .status(404)
      .json({ success: false, message: "Payment record not found" });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    payment.status = "success";
    payment.razorpay_payment_id = razorpay_payment_id;
    payment.razorpay_signature = razorpay_signature;
    payment.purchaseConfirmedAt = new Date();
    payment.courseTitleSnapshot = payment.course.title;
    await payment.save();

    const user = await User.findById(payment.user._id);
    if (!user.purchasedCourses.includes(payment.course._id)) {
      user.purchasedCourses.push(payment.course._id);
      await user.save();
    }
    puchasedCourseVerified(user, payment.course);

    return res.redirect(
      `${process.env.CLIENT_URL}/paymentSuccess?reference=${razorpay_payment_id}`
    );
  } else {
    payment.status = "failed";
    await payment.save();
    return res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
  }
};
