import { motion } from "framer-motion";
import { Link } from "react-router";


 const navLinks = [
  {label: "Home",  path:"/"},
  {label: "Login",  path:"/login"},
  {label: "Register", path:"/register"},
]

const Navbar = () => {
  
  return (
    <motion.div
      className="navbar bg-purple-600 text-white shadow-sm"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1">
        <motion.li
          className="btn btn-ghost text-xl text-white"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to={"/"}>Programing</Link>
        </motion.li>
      </div>

      <div className="flex-none">
        <motion.ul
          className="menu menu-horizontal px-1 gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {navLinks.map((item, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to={item.path}
                className="text-white"
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default Navbar;
