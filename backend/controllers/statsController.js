import TryCatch from "./../utils/TryCatch.js";
import Course from "./../models/course.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

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
    createdAt:{
        $gte: sixMonthStart,
        $lte: sixMonthEnd
    }
  });

  const totalSellCourse = Course.find({studentsEnrolled:{$exists: true, $ne: []}});


  const [totalCourses, createCourse, sixMonthRangCourse, tcourseTotalSell] = await Promise.all([
    courseCount,
    createCourseThisMonth,
    createCourseLastSixMonth,
    totalSellCourse
  ]);

  const courses = {
    totalCourses,
    onMotnhCourseCreate: createCourse,
    sixMonthRangCourse,
    totalSell: tcourseTotalSell.length
  };

  res.status(200).json({
    success: true,
    courses,
  });
});

