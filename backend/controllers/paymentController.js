import Course from "../models/course.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import stripe from "../utils/stripe.js";
import TryCatch from "../utils/TryCatch.js";

export const buyCourse = TryCatch(async (req, res, next) => {
  const courseId = req.params.courseId;

  const course = await Course.findById(courseId);
  if (!course) return next(new ErrorHandler("Course not found", 404));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: course.title,
            description: course.description,
            images: [course.thumbnail.secure_url],
          },
          unit_amount: course.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:5173/payment/success?courseId=${course._id}`,
    cancel_url: `http://localhost:5173/courses/${course._id}`,
    metadata: {
      courseId: course._id.toString(),
      userId: req.user._id.toString(),
    },
  });

  res.status(200).json({
    success: true,
    url: session.url,
  });

});

export const handleStripeWebhook = TryCatch(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const courseId = session.metadata.courseId;
    const userId = session.metadata.userId;

    try {
      const course = await Course.findById(courseId);
      if (!course) return res.status(404).end();

      const isAlreadyEnrolled = course.studentsEnrolled.includes(userId);
      if (!isAlreadyEnrolled) {
        course.studentsEnrolled.push(userId);
        await course.save();
        console.log("✅ User enrolled via Stripe Webhook");
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  }

  res.status(200).json({ received: true });
});

export const verifyEnrollment = TryCatch(async (req, res, next) => {
  const courseId = req.params.courseId;
  const userId = req.user._id;

  const course = await Course.findById(courseId);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  const isEnrolled = course.studentsEnrolled.includes(userId);

  res.status(200).json({
    success: true,
    enrolled: isEnrolled,
    message: isEnrolled
      ? "User is enrolled in the course"
      : "User is NOT enrolled yet",
  });
});
