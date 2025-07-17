import express from 'express';
import { createCourse, deleteCourse, getAllCourses, getCourseDetails, updateCourse } from '../controllers/courseController.js';
import { authorizeRoles, isAuthenticated } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();


router.route("/create-course").post(isAuthenticated,authorizeRoles("instructor", "admin"),upload.single("image"),createCourse)
router.route("/get-all-courses").get(isAuthenticated, getAllCourses);
router.route("/delete-course/:id").delete(isAuthenticated, authorizeRoles("instructor", "admin"), deleteCourse);
router.route("/get-course/:id").get(isAuthenticated, authorizeRoles("instructor", "admin", "student"), getCourseDetails);
router.route("/update-course/:id").put(isAuthenticated, authorizeRoles("instructor", "admin"), upload.single("image"), updateCourse);

export default router;
