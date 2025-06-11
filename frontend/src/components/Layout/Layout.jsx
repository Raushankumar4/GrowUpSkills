
import React, { useState } from "react";
import Sidebar from "../Sidbar/Sidebar";
import DashboardContent from "../Sidbar/DasboardContent";
import Dashboard from "../Dashboard/Dashboard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const heading = location.pathname.split("/")
  const navigate = useNavigate()
  const { userData } = useUserContext()

  const formattedHeading = heading[2]
    ? heading[2].charAt(0).toUpperCase() + heading[2].slice(1)
    : "Dashboard";


  return (
    <div className="flex h-screen overflow-hidden  bg-[#FFFFFF]">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-14  flex items-center justify-between px-6 text-white shadow-md">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden p-2 bg-purple-700 hover:bg-purple-800 rounded-md"
              title="Toggle Sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-lg text-black font-semibold">{formattedHeading}</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 shadow-2xl">
          {location.pathname === "/dashboard" && userData?.role === "Admin" && <Dashboard />}
          {location.pathname === "/dashboard" && userData?.role !== "Admin" && <DashboardContent />}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
