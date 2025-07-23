import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useLogoutUserMutation } from "../../redux/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slice/userSlice";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react"; // optional icons

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const currentUser = user?.user;
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      dispatch(clearUser(null));
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || "Logout failed");
    }
  };

  return (
    <motion.nav
      className="bg-purple-600 text-white shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center text-xl font-bold">
            <Link to="/" className="text-white">
              Programming
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to={"/"}
              className="hover:text-gray-300 transition duration-200"
            >
              Home
            </Link>

            {currentUser && currentUser.role === "student" && (
              <Link
                to={"/dashbord"}
                className="hover:text-gray-300 transition duration-200"
              >
                StudentDashboard
              </Link>
            )}

            {currentUser && currentUser.role == "instructor" && (
              <Link
                to={"/dashbord/instructor"}
                className="hover:text-gray-300 transition duration-200"
              >
                InstructorDashboard
              </Link>
            )}

            <Link
              to={"/dashbord/admin"}
              className="hover:text-gray-300 transition duration-200"
            >
              AdminDashboard
            </Link>

            {!currentUser && (
              <Link
                to={"/login"}
                className="hover:text-gray-300 transition duration-200"
              >
                Login
              </Link>
            )}

            {!currentUser && (
              <Link
                to={"/register"}
                className="hover:text-gray-300 transition duration-200"
              >
                Register
              </Link>
            )}

            {currentUser && (
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 transition duration-200"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="block text-white px-3 py-2 rounded-md hover:bg-purple-700"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
