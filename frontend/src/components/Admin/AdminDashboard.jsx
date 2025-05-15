import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidbar/Sidebar";
import { useState, useRef, useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { handleLogout } from "../Auth/logout";
import Dashboard from "../Dashboard/DashBoard";

const AdminDashboard = () => {
  const location = useLocation();
  const heading = location.pathname.split("/").pop();
  const [isOpen, setIsOpen] = useState(true);
  const { userData } = useUserContext();
  const navigate = useNavigate()

  const formattedHeading = heading
    ? heading.charAt(0).toUpperCase() + heading.slice(1)
    : "Dashboard";

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar (Sticky using fixed) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-md transition-all duration-300 ease-in-out z-50 ${isOpen ? "w-64" : "w-16"
          }`}
      >
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Main content area with dynamic margin */}
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ease-in-out ${isOpen ? "ml-64" : "ml-16"
          }`}
      >
        {/* Sticky Navbar */}
        <nav className="sticky right-10 top-0 z-40 bg-white w-full text-black h-16 flex items-center px-6 overflow-x-hidden shadow-md justify-between">
          {/* Left: Title */}
          <div className="flex items-center space-x-4 min-w-0">
            <h1 className="text-2xl px-10 sm:text-xl font-bold truncate">
              {formattedHeading}
            </h1>
          </div>

          <div className=" py-2">
            <button
              className="block z-50 w-full font-semibold text-left px-4 py-2 text-md hover:bg-gray-100"
              onClick={() => {
                handleLogout(navigate);
                setDropdownOpen(false);
              }}
            >
              Logout
            </button>
          </div>

        </nav>

        {/* Main page content */}
        <div className="flex-grow p-4 h-full overflow-y-auto bg-[#FFFFFF] border border-b-2 ">
          {
            location.pathname === "/dashboard" && <Dashboard />
          }
          <Outlet />
        </div>

      </div >
    </div >
  );
};

export default AdminDashboard;
