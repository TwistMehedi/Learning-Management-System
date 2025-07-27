import React from 'react';
import { useGetTotalSellInstructorQuery } from '../../redux/api/stats/statsApi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: 'spring',
    },
  }),
};

const AdminCharts = () => {
  const { data, isLoading, error } = useGetTotalSellInstructorQuery();

  if (isLoading) return <p className="text-center py-10">Loading chart...</p>;
  if (error || !data?.courses) return <p className="text-center py-10 text-red-500">Failed to load chart data</p>;

  const { totalCourses, onMotnhCourseCreate, sixMonthRangCourse, totalSell } = data.courses;

  const chartData = [
    { name: 'Total Courses', value: totalCourses },
    { name: 'Created This Month', value: onMotnhCourseCreate },
    { name: 'Last 6 Months', value: sixMonthRangCourse },
    { name: 'Courses Sell', value: totalSell },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Stats</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <motion.div
          className="bg-white dark:bg-gray-900 shadow-md border rounded-2xl p-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <h2 className="text-lg font-semibold mb-4">Course Stats (Bar Chart)</h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          className="bg-white dark:bg-gray-900 shadow-md border rounded-2xl p-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <h2 className="text-lg font-semibold mb-4">Course Distribution (Pie Chart)</h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminCharts;
