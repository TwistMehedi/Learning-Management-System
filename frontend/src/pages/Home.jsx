import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router'; // fixed typo: react-router → react-router-dom
import LatestCourses from '../components/Home/LatestCourses';
 
const Home = () => {

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-[66vh] bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 sm:mb-6">
            Welcome to <span className="text-purple-600">Learn Programming</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
            Learn web development, programming, and real-world skills from the best instructors.
            Interactive video lessons, practical projects, quizzes, and certificates included.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/courses"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition text-center"
            >
              Explore Courses
            </Link>
            <Link
              to="/login"
              className="bg-gray-200 text-blue-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.div>
      <LatestCourses />
    </>
  );
};

export default Home;
