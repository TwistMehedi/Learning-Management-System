import { Outlet } from "react-router";
import LeftSidebar from "../components/Dashbord/LeftSidebar";
import RightSidebar from "../components/Dashbord/RightSidebar";

const Dashbord = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Sidebar */}
      <aside className="w-full md:w-1/4 bg-gray-100 p-4 border-r border-gray-300">
        <LeftSidebar />
      </aside>

      {/* Right Content */}
      <main className="w-full md:w-3/4 p-4">
        <Outlet />
      </main>

      {/* <Outlet /> */}
    </div>
  );
};

export default Dashbord;
