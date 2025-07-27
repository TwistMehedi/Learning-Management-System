import React from 'react';
import { useAllCoursesForAdminQuery } from '../../redux/api/courses/courseApi';
import { Link } from "react-router";

const AllCourses = () => {
  const { data, isLoading } = useAllCoursesForAdminQuery();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {data?.courses?.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow p-4 flex flex-col items-center h-[300px] w-full"
          >
            {/* Course Thumbnail */}
            <img
              src={course.thumbnail?.secure_url || 'https://via.placeholder.com/150'}
              alt={course.title}
              className="w-full h-[120px] object-cover rounded-lg mb-3"
            />

            {/* Course Title */}
            <h3 className="text-base font-semibold text-center line-clamp-2 h-[48px]">
              {course.title}
            </h3>

            {/* Spacer to push instructor to bottom */}
            <div className="flex-grow"></div>

            {/* Instructor Info */}
            <div className="flex items-center mt-2 space-x-2">
              <img
                src={course.instructor?.image || 'https://via.placeholder.com/40'}
                alt={course.instructor?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="text-sm">{course.instructor?.name}</p>
            </div>
            <Link
                              to={`/course/${course._id}`}
                              className="text-blue-600 hover:underline text-sm"
                            >
                              View Details →
                            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
