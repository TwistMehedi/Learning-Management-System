import express from "express";
import { registerUser, verifyEmailAndCreateUser, loginUser, logoutUser } from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/verify-email").get(verifyEmailAndCreateUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

export default router;