import Comment from "../models/comment.model.js";
import Course from "../models/course.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import TryCatch from "../utils/TryCatch.js";

export const createComment = TryCatch(async (req, res, next) => {
  const { courseId, content, parentComment } = req.body;

  const userId = req.user._id;

  if (!courseId || !content) {
    return next(new ErrorHandler("Course ID and content are required", 400));
  };

  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  const comment = await Comment.create({
    course: courseId,
    user: userId,
    content,
    parentComment: parentComment || null,
  });

  const populatedComment = await comment.populate("user", "name image");

  res.status(201).json({
    success: true,
    message: "Comment created successfully",
    comment: populatedComment,
  });
});

 export const getCommentsWithReplies = TryCatch(async (req, res, next) => {
  const { courseId } = req.query;

  if (!courseId) {
    return next(new ErrorHandler("Course ID is required", 400));
  }

   const mainComments = await Comment.find({
    course: courseId,
    parentComment: null,
  })
    .sort({ createdAt: -1 })
    .populate("user", "name image")
    .lean(); // lean() করলে JS object আকারে আসবে, nested property যোগ করা সহজ হবে

  // রিকার্সিভ ভাবে reply আনবে
  async function getReplies(commentId) {
    const replies = await Comment.find({ parentComment: commentId })
      .sort({ createdAt: 1 })
      .populate("user", "name image")
      .lean();

    for (const reply of replies) {
      reply.replies = await getReplies(reply._id); // nested reply
    }

    return replies;
  }

  // প্রত্যেক main comment এর নিচে তার replies আনো
  for (const comment of mainComments) {
    comment.replies = await getReplies(comment._id);
  }

  res.status(200).json({
    success: true,
    comments: mainComments,
  });
});

export const deleteComment = TryCatch(async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(new ErrorHandler("Comment not found", 404));
  }

  // Check ownership (only comment owner can delete)
  if (comment.user.toString() !== userId.toString()) {
    return next(new ErrorHandler("You are not authorized to delete this comment", 403));
  };

  // Recursive function to delete all nested replies
  async function deleteReplies(parentId) {
    const replies = await Comment.find({ parentComment: parentId });
    for (const reply of replies) {
      await deleteReplies(reply._id); // delete child replies first
      await Comment.findByIdAndDelete(reply._id); // then delete this reply
    }
  }

  // Delete child replies (if any)
  await deleteReplies(comment._id);

  // Finally, delete the main comment
  await Comment.findByIdAndDelete(comment._id);

  res.status(200).json({
    success: true,
    message: "Comment and all its replies deleted successfully",
  });
});

export const editComment = TryCatch(async (req, res, next) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  if (!content || content.trim() === "") {
    return next(new ErrorHandler("Content is required", 400));
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(new ErrorHandler("Comment not found", 404));
  }

  // Ownership check
  if (comment.user.toString() !== userId.toString()) {
    return next(new ErrorHandler("You are not authorized to edit this comment", 403));
  }

  // Update comment content
  comment.content = content;
  await comment.save();

  const updatedComment = await comment.populate("user", "name image");

  res.status(200).json({
    success: true,
    message: "Comment updated successfully",
    comment: updatedComment,
  });
});

export const toggleLikeComment = TryCatch(async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user._id;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(new ErrorHandler("Comment not found", 404));
  }

  const index = comment.likes.findIndex((id) => id.toString() === userId.toString());

  if (index === -1) {
    // লাইক নাই, তাই যোগ করো
    comment.likes.push(userId);
  } else {
    // আগে লাইক করা আছে, তাই মুছে দাও (আনলাইক)
    comment.likes.splice(index, 1);
  }

  await comment.save();

  res.status(200).json({
    success: true,
    likesCount: comment.likes.length,
    message: index === -1 ? "Liked" : "Unliked",
  });
});
