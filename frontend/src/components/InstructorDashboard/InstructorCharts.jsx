import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useGetTotalSellInstructorQuery } from "../../redux/api/stats/statsApi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const InstructorCharts = () => {
  const { data } = useGetTotalSellInstructorQuery();
  console.log(data)
  const chartData = [
    { name: "Total Courses", value: data?.totalCourses || 0 },
    { name: "Total Sales", value: data?.totalSell || 0 },
    { name: "Unique Students", value: data?.uniqueStudentCount || 0 },
  ];

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Instructor Overview</h1>

      <PieChart width={350} height={350}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 w-full">
        <div className="bg-blue-100 text-blue-800 rounded-xl p-4 text-center font-semibold">
          Total Courses: {data?.totalCourses}
        </div>
        <div className="bg-green-100 text-green-800 rounded-xl p-4 text-center font-semibold">
          Total Sales: {data?.totalSell}
        </div>
        <div className="bg-yellow-100 text-yellow-800 rounded-xl p-4 text-center font-semibold">
          Unique Students: {data?.uniqueStudentCount}
        </div>
      </div>
    </div>
  );
};

export default InstructorCharts;
