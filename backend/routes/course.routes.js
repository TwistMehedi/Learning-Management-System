import express from "express";
import {
  categories,
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseDetails,
  getEnrollUserCourses,
  instructorByCourses,
  updateCourse,
} from "../controllers/courseController.js";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router
  .route("/create-course")
  .post(
    isAuthenticated,
    authorizeRoles("instructor", "admin"),
    upload.single("image"),
    createCourse
  );
router.route("/courses").get(getAllCourses);
router
  .route("/instructor-courses")
  .get(isAuthenticated, authorizeRoles("instructor"), instructorByCourses);
router.route("/categories").get(categories);
router.route("/enroll-course").get(isAuthenticated, getEnrollUserCourses);
router
  .route("/delete-course/:id")
  .delete(isAuthenticated, authorizeRoles("instructor", "admin"), deleteCourse);
router
  .route("/course/:id")
  .get(
    isAuthenticated,
    authorizeRoles("instructor", "admin", "student"),
    getCourseDetails
  );
router
  .route("/update-course/:id")
  .put(
    isAuthenticated,
    authorizeRoles("instructor", "admin"),
    upload.single("image"),
    updateCourse
  );

export default router;
