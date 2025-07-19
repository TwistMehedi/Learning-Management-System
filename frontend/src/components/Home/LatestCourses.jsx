import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const latestCourses = [
  {
    _id: '1',
    title: 'React for Beginners',
    thumbnail: 'https://via.placeholder.com/300x180.png?text=React',
    instructor: 'John Doe',
  },
  {
    _id: '2',
    title: 'Advanced Node.js',
    thumbnail: 'https://via.placeholder.com/300x180.png?text=Node.js',
    instructor: 'Jane Smith',
  },
  {
    _id: '3',
    title: 'Fullstack MERN Bootcamp',
    thumbnail: 'https://via.placeholder.com/300x180.png?text=MERN',
    instructor: 'Alex Dev',
  },
  {
    _id: '4',
    title: 'TypeScript Mastery',
    thumbnail: 'https://via.placeholder.com/300x180.png?text=TypeScript',
    instructor: 'Linda Type',
  },
  {
    _id: '5',
    title: 'Express & MongoDB API',
    thumbnail: 'https://via.placeholder.com/300x180.png?text=Express+Mongo',
    instructor: 'Mark Backend',
  },
];

const LatestCourses = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-800">Latest Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {latestCourses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
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
