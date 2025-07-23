import React from 'react';
import { useEnrollCoursesQuery } from '../../redux/api/courses/courseApi';

const EnrollCourses = () => {
  const { data = [], isLoading } = useEnrollCoursesQuery();

  if (isLoading) {
    return <p className="text-center mt-10">Loading your enrolled courses...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">🎓 Your Enrolled Courses</h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => {
            const course = item.courseId || item; // In case of populate or direct course

            return (
              <div
                key={course._id}
                className="bg-white border rounded-lg shadow hover:shadow-md transition overflow-hidden"
              >
                <img
                  src={course.thumbnail?.secure_url}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.description?.slice(0, 80)}...</p>

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>📚 {course.level}</span>
                  </div>

                  <div className="text-xs text-blue-600">Category: {course.category}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrollCourses;
