import React from "react";
import LeftSidebarInstructor from "../components/InstructorDashboard/LeftSidebarInstructor";
import { Outlet } from "react-router";

const InstructorDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-1/4 bg-gray-100 p-4 border-r border-gray-300">
        <LeftSidebarInstructor />
      </aside>

      <main className="w-full md:w-3/4 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorDashboard;
