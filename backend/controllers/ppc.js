import Course from "../models/course.model";
import TryCatch from "../utils/TryCatch";

export const createComment = TryCatch(async(req, res, next)=>{
    const {courseId, content, paranetComment} = req.body;

    if(!courseId || !content){
        return next(new ErrorHandler("Course id and conetent are required", 400))
    };

    const course = await Course.findById(courseId);
    if(!course){
        return next(new ErrorHandler("Course not found", 404));
    };

    const comment = await Comment.create({
        course: course._id,
        user: req.user._id,
        content,
        paranetComment: paranetComment || null,
    });

    const populatedComment = await comment.populate("user", "name image");

    res.status(201).json({
        success: true,
        message: "Comment created successfully",
        comment: populatedComment,
    });
});

export const getCommentWithReplies = TryCatch(async(req, res, next)=>{
    const {courseId} = req.query;
    if(!courseId){
        return next(new ErrorHandler("Course id is required", 400));
    };
    const course = await Course.findById(courseId);
    if(!course){
        return next(new ErrorHandler("Course not found", 404));
    };

    const mainComments = await Comment.find({
        course: course._id,
        paranetComment: null
    }).sort({createdAt: -1}).populate("user", "name image").lean();

    const getReplies = async(commentId)=>{

        const replies = await Comment.find({paranetComment: commentId}).sort({createdAt: 1}).populate("user", "name image").lean();
        for(const reply of replies){
            reply.replies = await getReplies(reply._id);
            reply.likes = reply.likes.length;
        };

        return replies;
    };

    for(const comment of mainComments){
        comment.replies = await getReplies(comment._id);
        comment.likes = comment.likes.length;
    };

    res.status(200).json({
        success: true,
        comments: mainComments,
    });
});


export const delteComment = TryCatch(async(req, res, next)=>{
const {commentId} = req.params;
if(!commentId){
    return next(new ErrorHandler("Comment id is required", 400))
};

const comment = await Comment.findById(commentId);
if(!comment){
    return next(new ErrorHandler("Comment not found", 404));
};

if(!comment.user.toString()=== req.user._id.toString()){
    return next(new ErrorHandler("You are not authorized to delete this comment", 403));
};

const deteteReplies = async(commentId)=>{
    const replies = await Comment.find({parentComment: commentId});
    for(const reply of replies){
        await deteteReplies(reply._id);
         await Comment.findByIdAndDelete(reply._id);
    };
    return replies;
};

await deteteReplies(commentId);

await Comment.findByIdAndDelete(commentId);

res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
    commentId,
});

})