import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { buyCourse, handleStripeWebhook, verifyEnrollment } from "../controllers/paymentController.js";

const router = express.Router();

router.route("/checkout/:id").post(isAuthenticated, buyCourse);
router.route("/webhook").post(bodyParser.raw({ type: "application/json" }), handleStripeWebhook);
router.get("/verify/:courseId", isAuthenticated, verifyEnrollment);

export default router;
