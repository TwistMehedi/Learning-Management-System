import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useLatestCoursesQuery } from '../../redux/api/courses/courseApi';

 

const LatestCourses = () => {
  const {data} = useLatestCoursesQuery();
    const latestCourses = data?.courses;
// console.log(data)
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-800">Latest Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {latestCourses?.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <img src={course.thumbnail?.secure_url} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-2">By {course.instructor}</p>
                <Link
                  to={`/course/${course._id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Details →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCourses;
