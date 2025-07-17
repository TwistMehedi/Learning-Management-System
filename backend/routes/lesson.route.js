import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware.js";
import { createLesson, getAllLessonsByCourse, getLessonById } from "../controllers/lesonController.js";

const router = express.Router();

router.route("create-lessom").post(isAuthenticated, authorizeRoles("instructor", "admin"), createLesson);
router.route("get-all-lessons-by-course").get(isAuthenticated, getAllLessonsByCourse);
router.route("get-all-lessons-by-course").get(isAuthenticated, getLessonById);

export default router;