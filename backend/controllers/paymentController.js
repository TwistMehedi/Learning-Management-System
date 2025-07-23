import Course from "../models/course.model.js";
import Purchase from "../models/payment.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import stripe from "../utils/stripe.js";
import TryCatch from "../utils/TryCatch.js";

export const buyCourse = TryCatch(async (req, res, next) => {
  const { course } = req.body;
  const userId = req.user._id;

  if (!course) {
    return res.status(400).json({ error: "Course data is required" });
  }

  const alreadyPurchase = await Purchase.findOne({
    courseId: course._id,
    userId,
    paymentStatus: "success",
  });

  if (alreadyPurchase) {
    return res.status(400).json({ message: "Already purchased this course" });
  }

  if (!course.title || !course.price) {
    return res
      .status(400)
      .json({ error: "Course title and price are required" });
  }

  const price = Number(course.price);

  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ error: "Invalid course price" });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "bdt",
          product_data: {
            name: course.title,
            description: course.description || "",
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: userId.toString(), // ✅ convert to string
      courseId: course._id.toString(),
    },

    mode: "payment",
    success_url:
      "http://localhost:5173/payment/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:5173/payment/cancel",
  });

  res.json({ id: session.id });
});

export const verifyEnrollment = TryCatch(async (req, res, next) => {
  const { sessionId } = req.body;

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const { userId, courseId } = session.metadata;

  let course = await Course.findById(courseId);
  
  const alreadyPurchased = await Purchase.findOne({
    courseId,
    userId,
    paymentStatus: "success",
  });

  if (alreadyPurchased) {
    return next(new ErrorHandler("Already purchased this course", 400));
  }

  await Purchase.create({
    userId,
    courseId,
    price: session.amount_total / 100,
    paymentStatus: "success",
  });

  if (!course.studentsEnrolled.includes(userId)) {
    course.studentsEnrolled.push(userId);
    await course.save();
  }

  res.status(200).json({ message: "Payment confirmed & course enrolled" });
});

