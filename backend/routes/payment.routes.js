import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { buyCourse, verifyEnrollment,  } from "../controllers/paymentController.js";
import bodyParser from "body-parser";

const router = express.Router();

router.route("/create-checkout-session").post(isAuthenticated, buyCourse);
router.route("/verify-enroll").post(isAuthenticated, verifyEnrollment);
// router.route("/webhook").post(bodyParser.raw({ type: "application/json" }), handleStripeWebhook);
// router.get("/verify/:courseId", isAuthenticated, verifyEnrollment);

export default router;
