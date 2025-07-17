import TryCatch from "./../utils/TryCatch.js";
import Course from "../models/course.model.js";
import { ErrorHandler } from "./../utils/ErrorHandler.js";
import { deleteImage, uploadFile } from "../utils/cloudinary.js";
import Lesson from "../models/leson.model.js";


export const createCourse = TryCatch(async (req, res, next) => {
  const { title, description, category, price, level } = req.body;
  const file = req.file;

  if (!title || !description || !category || !price || !level)
    return next(new ErrorHandler("All fields are required", 400));

  if (!file) return next(new ErrorHandler("Image is required", 400));

  const validLevels = ["beginner", "intermediate", "advanced"];
  if (!validLevels.includes(level.toLowerCase()))
    return next(new ErrorHandler("Invalid course level", 400));

  const imageUploadResult = await uploadFile(file.path);
  const image = {
    public_id: imageUploadResult.public_id,
    secure_url: imageUploadResult.secure_url,
  };
  if (!image) return next(new ErrorHandler("Image upload failed", 400));

  const course = await Course.create({
    title,
    description,
    category,
    price,
    thumbnail: image,
    level,
    instructor: req.user._id
  });

  res.status(201).json({
    message: "Course created successfully",
    success: true,
    course,
  });
});

export const getAllCourses = TryCatch(async (req, res, next) => {
  const { search, price, category, sort } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  let query = {
    
  };

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  if (price) {
    const [min, max] = price.split("-").map(Number);
    query.price = { $gte: min || 0, $lte: max || Number.MAX_SAFE_INTEGER };
  }

  // Sorting
  let sortOption = { createdAt: -1 };
  if (sort === "asc") sortOption = { price: 1 };
  else if (sort === "desc") sortOption = { price: -1 };

  // Fetch courses
  const [courses, totalCourses] = await Promise.all([
    Course.find(query).sort(sortOption).skip(skip).limit(limit),
    Course.countDocuments(query),
  ]);

  const totalPage = Math.ceil(totalCourses / limit);

  if (!courses || courses.length === 0) {
    return next(new ErrorHandler("No courses found", 404));
  }

  res.status(200).json({
    message: "Courses fetched successfully",
    success: true,
    courses,
    totalCourses,
    totalPage,
    currentPage: page,
  });
});

export const deleteCourse = TryCatch(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  const isOwner = course.instructor.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return next(
      new ErrorHandler("You are not authorized to delete this course", 403)
    );
  }

  if (course.thumbnail && course.thumbnail.public_id) {
    await deleteImage(course.thumbnail.public_id);
  }

  const lessons = await Lesson.find({ _id: { $in: course.lessons } });

  await Promise.all(
    lessons.map((lesson) => {
      if (lesson.videoUrl && lesson.videoUrl.public_id) {
        return deleteVideo(lesson.videoUrl.public_id);
      }
      return Promise.resolve(); // For lessons without videoUrl
    })
  );

  await Lesson.deleteMany({ _id: { $in: course.lessons } });

  await course.deleteOne();

  res.status(200).json({
    message: "Course and its lessons deleted successfully",
    success: true,
  });
  
});


export const getCourseDetails = TryCatch(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate("instructor", "name");

  if (!course) return next(new ErrorHandler("Course not found", 404));

  res.status(200).json({
    message: "Course details fetched successfully",
    success: true,
    course,
  });
});

export const updateCourse = TryCatch(async (req, res, next) => { 

  const course = await Course.findById(req.params.id);

  // console.log(req.body,"body")
  if (!course) return next(new ErrorHandler("Course not found", 404));

  const isOwner = course.instructor.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return next(
      new ErrorHandler("You are not authorized to update this course", 403)
    );
  }

  const { title, description, category, price, level } = req.body;
  const file = req.file;

  if (file) {
    if (course.thumbnail && course.thumbnail.public_id) {
      await deleteImage(course.thumbnail.public_id);
    }
    const imageUploadResult = await uploadFile(file.path);
    course.thumbnail = {
      public_id: imageUploadResult.public_id,
      secure_url: imageUploadResult.secure_url,
    };
  }

  if (title) course.title = title;
  if (description) course.description = description;
  if (category) course.category = category;
  if (price) course.price = price;
  if (level) {
    const validLevels = ["beginner", "intermediate", "advanced"];
    if (!validLevels.includes(level.toLowerCase())) {
      return next(new ErrorHandler("Invalid course level", 400));
    }
    course.level = level;
  };

  if(course) course.userId = req.user._id

  await course.save();

 
  res.status(200).json({
    message: "Course updated successfully",
    success: true,
    course,
  });
});