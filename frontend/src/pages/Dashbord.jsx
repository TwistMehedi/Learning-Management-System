import { Outlet } from "react-router";
import LeftSidebar from "../components/Dashbord/LeftSidebar";

const Dashbord = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
     
      <aside className="w-full md:w-1/4 bg-gray-100 p-4 border-r border-gray-300">
        <LeftSidebar />
      </aside>

 
      <main className="w-full md:w-3/4 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashbord;
