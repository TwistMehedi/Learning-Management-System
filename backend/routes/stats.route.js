import express from "express";
import { instructor, totalCourse } from "../controllers/statsController.js";
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/course", isAuthenticated, authorizeRoles("admin"), totalCourse);
router.get("/instructor", isAuthenticated, authorizeRoles("instructor"), instructor);

export default router;