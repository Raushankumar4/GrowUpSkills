import Stripe from "stripe";
import User from "./user.model.js";
import dotenv from "dotenv";
import { Course } from "./course.model.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const buyCourse = async (req, res) => {
  try {
    const { amount, currency, courseId, userId } = req.body;

    if (!courseId || !userId) {
      return res
        .status(400)
        .json({ error: "Course ID and User ID are required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Create the payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency, // The currency (e.g., 'usd')
      automatic_payment_methods: { enabled: true },
    });

    const clientSecret = paymentIntent.client_secret;

    return res.status(200).json({
      clientSecret,
      courseId,
      message:
        "Payment intent created successfully. Please confirm your payment.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, userId, courseId } = req.body;

    // Validate the input data
    if (!paymentIntentId || !userId || !courseId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Confirm the payment with Stripe API
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Check if the user already purchased the course
      if (user.purchasedCourses.includes(courseId)) {
        return res
          .status(400)
          .json({ error: "You already purchased this course" });
      }
      user.purchasedCourses.push(courseId);

      // Save the updated user document
      await user.save();

      // Return success message
      return res.status(200).json({
        message: "Course purchased successfully!",
        purchasedCourses: user.purchasedCourses,
      });
    } else {
      return res.status(400).json({ error: "Payment failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
