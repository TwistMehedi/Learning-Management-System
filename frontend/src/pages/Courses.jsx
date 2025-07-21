import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  useAllCoursesQuery,
  useCategoriesQuery,
} from "../redux/api/courses/courseApi";
import { Link, useNavigate } from "react-router";

const Courses = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState(10000);

  const { data: categoryData } = useCategoriesQuery();
  const categories = categoryData?.categoris;
  const navigate = useNavigate();

  const { data, isLoading } = useAllCoursesQuery({
    search,
    category,
    sort,
    price: `0-${priceRange}`,
  });

  const courses = data?.courses || [];
  console.log(courses);
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Search */}
        <div className="lg:w-1/4 w-full bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Search Courses</h2>
          <input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Right Side: Filter + Course List */}
        <div className="lg:w-3/4 w-full space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-between bg-white p-4 rounded-xl shadow items-center">
            <select
              className="select select-bordered w-full sm:w-48"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>

            <select
              className="select select-bordered w-full sm:w-48"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Category</option>
              {categories?.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>

            {/* Price Range Slider */}
            <div className="flex flex-col w-full sm:w-48">
              <label className="text-sm font-medium mb-1">
                Max Price: ${priceRange}
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="range w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card bg-white shadow p-4 rounded-xl hover:shadow-lg"
              >
                <img
                  src={course?.thumbnail?.secure_url}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded"
                />
                <h3 className="text-lg font-bold mt-2">{course.title}</h3>
                <p className="text-sm text-gray-500">Price: ${course.price}</p>
                <p className="badge badge-outline mt-2">{course.category}</p>
                <Link
                  to={`/course/${course._id}`}
                  className="badge badge-outline mt-2"
                >
                  Course Details
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
