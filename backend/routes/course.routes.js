import express from 'express';
import { createCourse, deleteCourse, getAllCourses } from '../controllers/courseController.js';
import { authorizeRoles, isAuthenticated } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.route("/create-course").post(isAuthenticated,authorizeRoles("instructor", "admin"),upload.single("image"),createCourse)
router.route("/get-all-courses").get(isAuthenticated, getAllCourses);
router.route("/delete-course/:id").delete(isAuthenticated, authorizeRoles("instructor", "admin"), deleteCourse);

export default router;
