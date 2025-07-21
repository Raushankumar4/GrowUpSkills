import React, { useState } from "react";
import Sidebar from "../Sidbar/Sidebar";
import DashboardContent from "../Sidbar/DasboardContent";
import Dashboard from "../Dashboard/Dashboard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { handleLogout } from "../Auth/logout";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useUserContext();

  console.log("User Data:", userData); // Debugging line to check user data

  const heading = location.pathname.split("/");
  const formattedHeading = heading[2]
    ? heading[2].charAt(0).toUpperCase() + heading[2].slice(1)
    : "Dashboard";

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    handleLogout(navigate);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-14 bg-white flex items-center justify-between px-6 border-b shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden p-2 bg-sky-500 hover:bg-sky-600 rounded-md"
              title="Toggle Sidebar"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <span className="text-lg font-semibold text-gray-800">
              {formattedHeading}
            </span>
          </div>

          {/* Right Side - User Avatar & Logout */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 bg-sky-100 px-3 py-1 rounded-full hover:bg-sky-200 transition"
            >
              <img
                src={
                  (userData && userData?.avatar) ||
                  (userData && userData?.photo) ||
                  "/user.png"
                }
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border"
              />
              <span className="text-sm font-medium text-gray-700">
                {userData?.username?.split(" ")[0] || "User"}
              </span>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fade-in">
                <div className="py-2 px-4 border-b">
                  <p className="text-sm font-medium text-gray-800">
                    {userData?.username || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userData?.email || "you@example.com"}
                  </p>
                </div>

                <ul className="py-1">
                  <li>
                    <button
                      onClick={handleLogoutClick}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                    >
                      <span className="text-lg">
                        <img className="h-5 w-5"
                          src="https://img.icons8.com/?size=100&id=fmOzBzMvUPQR&format=png&color=000000"
                          alt="Logout Icon"
                        />
                      </span>{" "}
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4">
          {location.pathname === "/dashboard" && userData?.role === "Admin" && (
            <Dashboard />
          )}
          {location.pathname === "/dashboard" && userData?.role !== "Admin" && (
            <DashboardContent />
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
