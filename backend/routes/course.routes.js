import express from "express";
import {
  categories,
  createCourse,
  deleteCourse,
  getAllCourses,
  getAllCoursesForAdmin,
  getCourseDetails,
  getEnrollUserCourses,
  instructorByCourses,
  latestCourses,
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

router
  .route("/all/courses/for/admin")
  .get(
    isAuthenticated,
    authorizeRoles("admin"),
    getAllCoursesForAdmin
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

  router.route("/latest-courses").get(latestCourses)

export default router;
