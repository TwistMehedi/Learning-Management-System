import React from "react";
import { motion } from "framer-motion";

const Courses = () => {
  const fakeCourses = Array(15).fill().map((_, i) => ({
    title: `Course ${i + 1}`,
    price: Math.floor(Math.random() * 100),
    category: i % 2 === 0 ? "Web Dev" : "Design",
  }));

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Search */}
        <div className="lg:w-1/4 w-full bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Search Courses</h2>
          <input type="text" placeholder="Search…" className="input input-bordered w-full" />
        </div>

        {/* Right Side: Filter + Course List */}
        <div className="lg:w-3/4 w-full space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-between bg-white p-4 rounded-xl shadow items-center">
            <select className="select select-bordered w-full sm:w-48">
              <option disabled selected>Sort by Price</option>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>

            <select className="select select-bordered w-full sm:w-48">
              <option disabled selected>Category</option>
              <option>Web Dev</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>

            {/* Optional Range Slider */}
            <input type="range" min="0" max="100" className="range w-full sm:w-48" />
          </div>

          {/* Courses Grid */}
          <div className="space-y-8">
            {Array.from({ length: Math.ceil(fakeCourses.length / 5) }, (_, rowIndex) => (
              <motion.div
                key={rowIndex}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              >
                {fakeCourses.slice(rowIndex * 5, rowIndex * 5 + 5).map((course, index) => (
                  <div key={index} className="card bg-white shadow p-4 rounded-xl hover:shadow-lg">
                    <h3 className="text-lg font-bold">{course.title}</h3>
                    <p className="text-sm text-gray-500">Price: ${course.price}</p>
                    <p className="badge badge-outline mt-2">{course.category}</p>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
