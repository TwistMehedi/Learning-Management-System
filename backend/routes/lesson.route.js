import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware.js";
import { createLesson, deleteLesson, freeLesson, getAllLessonsByCourse, getLessonById } from "../controllers/lesonController.js";
import upload from './../middleware/multer.js';

const router = express.Router();

router.route("/create").post(isAuthenticated, authorizeRoles("instructor", "admin"),upload.single("video"), createLesson);
router.route("/:courseId/free").get(freeLesson);
router.route("/:courseId/lessons").get(isAuthenticated,authorizeRoles("instructor", "admin"), getAllLessonsByCourse);
router.route("/lesson/:id").get(isAuthenticated,authorizeRoles("instructor", "admin"), getLessonById);
router.route("/delete/:id").delete(isAuthenticated, authorizeRoles("instructor", "admin"), deleteLesson);

export default router;