import TryCatch from "./../utils/TryCatch.js";
import Course from "./../models/course.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import Purchase from "../models/payment.model.js";

export const totalCourse = TryCatch(async (req, res, next) => {
  const startMonth = new Date();
  startMonth.setDate(1);
  startMonth.setHours(0, 0, 0, 0);

  const endMonth = new Date();
  endMonth.setMonth(endMonth.getMonth() + 1);
  endMonth.setDate(0);
  endMonth.setHours(23, 59, 59, 999);

  //6 moth ago
  const sixMonthStart = new Date();
  sixMonthStart.setMonth(sixMonthStart.getMonth() - 6);
  sixMonthStart.setDate(1);
  sixMonthStart.setHours(0, 0, 0, 0);
  //now
  const sixMonthEnd = new Date();

  const courseCount = Course.countDocuments();
  const createCourseThisMonth = Course.countDocuments({
    createdAt: {
      $gte: startMonth,
      $lte: endMonth,
    },
  });

  const createCourseLastSixMonth = Course.countDocuments({
    createdAt: {
      $gte: sixMonthStart,
      $lte: sixMonthEnd,
    },
  });

  const totalSellCourse = Course.find({
    studentsEnrolled: { $exists: true, $ne: [] },
  });

  const [totalCourses, createCourse, sixMonthRangCourse, tcourseTotalSell] =
    await Promise.all([
      courseCount,
      createCourseThisMonth,
      createCourseLastSixMonth,
      totalSellCourse,
    ]);

  const courses = {
    totalCourses,
    onMotnhCourseCreate: createCourse,
    sixMonthRangCourse,
    totalSell: tcourseTotalSell.length,
  };

  res.status(200).json({
    success: true,
    courses,
  });
});

export const instructor = TryCatch(async (req, res, next) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(400).json({ message: "User not found" });
  }

  const courses = await Course.find({ instructor: userId });

  const totalCourses = courses.length;

  const courseIds = courses.map((course) => course._id);

  const totalSell = await Purchase.countDocuments({
    courseId: { $in: courseIds },
    paymentStatus: "success",
  });

  const uniqueStudentIds = await Purchase.countDocuments({
    userId: { $in: userId },
    paymentStatus: "success",
  });

  const monthlySales = await Purchase.aggregate([
    {
      $match: {
        courseId: { $in: courseIds },
        paymentStatus: "success",
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m", date: "$createdAt" },
        },
        totalSales: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json({
    totalCourses,
    totalSell,
    uniqueStudentIds,
    monthlySales,
  });
});
