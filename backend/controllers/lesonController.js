import TryCatch from "../utils/TryCatch.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import Lesson from "../models/leson.model.js";
import Course from "../models/course.model.js";
import { deleteVideo, uploadFile } from "../utils/cloudinary.js";

export const createLesson = TryCatch(async (req, res, next) => {
  
  const { title, courseId } = req.body;

  const file = req.file;


  if (!title || !courseId) {
    return next(new ErrorHandler("Title and Course ID are required", 400));
  };

  if (!file) {
    return next(new ErrorHandler("Video file is required", 400));
  };
 
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  };

  const videoResult = await uploadFile(file.path);
 
  const lesson = await Lesson.create({
    title,
    videoUrl: {
      public_id: videoResult.public_id,
      secure_url: videoResult.secure_url,
    },
    course: courseId,
  });

  if (!lesson) {
    return next(new ErrorHandler("Lesson creation failed", 400));
  }

 
  course.lessons.push(lesson._id);
  await course.save();

 
  res.status(201).json({
    success: true,
    message: "Lesson created and linked to course",
    lesson,
  });
});

export const deleteLesson = TryCatch(async (req, res, next) => {

  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) return next(new ErrorHandler("Lesson not found", 404));

  if (lesson.videoUrl?.public_id) {
    await deleteVideo(lesson.videoUrl.public_id);
  };

  const course = await Course.findById(lesson.course);
  if (course) {
    course.lessons.pull(lesson._id);
    await course.save();
  }

  await lesson.deleteOne();

  res.status(200).json({
    success: true,
    message: "Lesson deleted successfully",
  });
});

export const getAllLessonsByCourse = TryCatch(async (req, res, next) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  const lessons = await Lesson.find({ course: courseId }).populate(
    "course",
    "title"
  );

  if (!lessons || lessons.length === 0) {
    return next(new ErrorHandler("No lessons found", 404));
  }

  res.status(200).json({
    success: true,
    lessons,
  });
});

export const getLessonById = TryCatch(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id).populate(
    "course",
    "title"
  );

  if (!lesson) return next(new ErrorHandler("Lesson not found", 404));

  res.status(200).json({
    success: true,
    lesson,
  });
});

export const updateLesson = TryCatch(async (req, res, next) => {
  const { title } = req.body;

  const file = req.file;

  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return next(new ErrorHandler("Lesson not found", 404));

  if (title) lesson.title = title;

  if (file) {
    if (lesson.videoUrl && lesson.videoUrl.public_id) {
      await deleteVideo(lesson.videoUrl.public_id);
    }

    const videoResult = await uploadFile(file.path);
    lesson.videoUrl = {
      public_id: videoResult.public_id,
      secure_url: videoResult.secure_url,
    };
  }

  await lesson.save();

  res.status(200).json({
    success: true,
    message: "Lesson updated successfully",
    lesson,
  });
});
