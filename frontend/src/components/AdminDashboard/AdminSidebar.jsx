import { NavLink } from "react-router";
import { FaUser, FaBook, FaChartBar } from "react-icons/fa";
  
const AdminSidebar = () => {
  return (
    <nav className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Dashboard Menu</h2>
      <ul className="space-y-2">
        <li>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center space-x-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`
            }
          >
            <FaUser />
            <span>Profile</span>
          </NavLink>
        </li>
         
        <li>
          <NavLink
            to="all/courses"
            className={({ isActive }) =>
              `flex items-center space-x-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`
            }
          >
            <FaBook />
            <span>Courses</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="charts"
            className={({ isActive }) =>
              `flex items-center space-x-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`
            }
          >
            <FaChartBar />
            <span>Charts</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
