import express from "express";
import { isAuthenticated } from './../middleware/authMiddleware.js';
import { createComment, deleteComment, editComment, getCommentsWithReplies, toggleLikeComment } from "../controllers/commentController.js";
 
const router = express.Router();

router.route("/create-comment").post(isAuthenticated, createComment)
router.route("/get-comments").get(isAuthenticated, getCommentsWithReplies)
router.route("/delete-comment/:commentId").delete(isAuthenticated, deleteComment)
router.route("/edit-comment/:commentId").put(isAuthenticated, editComment);
router.route("/like-unlike/:commentId").patch(isAuthenticated, toggleLikeComment);

export default router;