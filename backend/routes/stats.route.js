import express from "express";
import { totalCourse } from "../controllers/statsController.js";
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/course", isAuthenticated, authorizeRoles("instructor","admin"), totalCourse);

export default router;