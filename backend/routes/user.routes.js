import express from "express";
import { getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(isAuthenticated, getUser)

export default router;