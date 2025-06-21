import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaBullhorn,
  FaBook,
  FaCalendarAlt,
  FaFileAlt,
  FaCertificate,
  FaShoppingCart,
  FaUser,
  FaUsersCog,
  FaChartBar,
  FaCogs,
  FaClipboardList,
  FaUsers,
  FaDatabase,
  FaCreditCard,
  FaDollarSign,
  FaBookMedical,
  FaPenFancy,
} from "react-icons/fa";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { userData, fetchProfile } = useUserContext();

  useEffect(() => {
    const fetchUserData = async () => {
      await fetchProfile();
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 640) {
        setIsOpen(false);
        setIsSmallScreen(true);
      } else {
        setIsOpen(true);
        setIsSmallScreen(false);
      }
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    {
      name: "Announcements",
      icon: <FaBullhorn />,
      path: "/dashboard/announcements",
    },
    { name: "My Courses", icon: <FaBook />, path: "/dashboard/course" },
    { name: "Exams", icon: <FaFileAlt />, path: "/dashboard/my-exams" },
    {
      name: "Certificates",
      icon: <FaCertificate />,
      path: "/dashboard/certificates",
    },
    {
      name: "My Purchases",
      icon: <FaShoppingCart />,
      path: "/dashboard/purchase",
    },
    { name: "Settings", icon: <FaCogs />, path: "/dashboard/settings" },
  ];

  const adminMenuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    {
      name: "User Management",
      icon: <FaUsersCog />,
      path: "/dashboard/user-management",
    },
    {
      name: "Add Course",
      icon: <FaBookMedical />,
      path: "/dashboard/create-course",
    },
    { name: "Add Exam", icon: <FaPenFancy />, path: "/dashboard/create-exam" },
    {
      name: "Manage Courses",
      icon: <FaClipboardList />,
      path: "/dashboard/manage-courses",
    },
    { name: "Analytics", icon: <FaDatabase />, path: "/dashboard/analytics" },
    {
      name: "Payment History",
      icon: <FaCreditCard />,
      path: "/dashboard/payment-history",
    },
    { name: "Revenue", icon: <FaDollarSign />, path: "/dashboard/revenue" },
    { name: "Settings", icon: <FaCogs />, path: "/dashboard/settings" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } z-50 bg-white  border-r border-sky-200 overflow-y-auto overflow-x-hidden shadow-sm h-full  p-4 duration-300 relative`}
    >
      {/* Toggle button */}
      {!isSmallScreen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 right-[10px] bg-sky-600 text-white p-1 rounded-full z-10 shadow"
        >
          {isOpen ? (
            <ChevronLeftIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )}
        </button>
      )}

      {/* SkillHub Logo */}
      <Link
        to="/"
        className={`text-2xl cursor-pointer font-bold text-sky-700 mb-6 ${
          !isOpen && "hidden"
        }`}
      >
        SkillHub
      </Link>

      {/* Main Menu */}
      {userData?.role !== "Admin" && (
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 640) {
                  setIsOpen(false);
                }
              }}
              className={`flex  items-center space-x-3 cursor-pointer px-3 py-3 rounded-lg transition-all duration-200 ${
                item.path === "/dashboard"
                  ? pathname === item.path
                  : pathname.startsWith(item.path)
                  ? "bg-sky-500 text-white font-semibold"
                  : "hover:bg-sky-100 text-gray-700"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className={`${!isOpen && "hidden"} truncate`}>
                {item.name}
              </span>
            </Link>
          ))}
          {/* Profile Section */}
          <div
            onClick={() => navigate("/dashboard/profile")}
            className="flex items-center space-x-3 cursor-pointer  py-2 px-1 rounded-lg hover:bg-sky-100 transition-all"
          >
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={userData?.photo || userData?.avatar}
              alt="profile"
            />

            {console.log("UserData", userData)}

            {isOpen && (
              <div className="truncate">
                <h1 className="text-sm font-semibold truncate">
                  {userData?.username || userData?.displayName}
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  {userData?.email}
                </p>
              </div>
            )}
          </div>
        </ul>
      )}

      {/* Admin Panel */}
      {userData?.role === "Admin" && (
        <>
          <hr className="my-4 border-sky-200" />
          <h2
            className={`text-xs text-gray-500 uppercase tracking-wide ${
              !isOpen && "hidden"
            }`}
          >
            Admin Panel
          </h2>
          <ul className="space-y-2 mt-2">
            {adminMenuItems.map((item) => (
              <Link
                onClick={() => {
                  if (window.innerWidth < 640) {
                    setIsOpen(false);
                  }
                }}
                key={item.name}
                to={item.path}
                className={`flex  items-center space-x-3 cursor-pointer px-3 py-3 rounded-lg transition-all duration-200 ${
                  item.path === "/dashboard"
                    ? pathname === item.path
                    : pathname.startsWith(item.path)
                    ? "bg-sky-500 text-white font-semibold"
                    : "hover:bg-sky-100 text-gray-700"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className={`${!isOpen && "hidden"} truncate`}>
                  {item.name}
                </span>
              </Link>
            ))}
            {/* Profile Section */}
            <div
              onClick={() => navigate("/dashboard/profile")}
              className="flex cursor-pointer items-center space-x-3 p-2 rounded-lg hover:bg-sky-100 transition-all"
            >
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={userData?.avatar || userData?.photo}
                alt="profile"
              />
              {isOpen && (
                <div className="truncate">
                  <h1 className="text-sm font-semibold truncate">
                    {userData?.username || userData?.displayName}
                  </h1>
                  <p className="text-xs text-gray-500 truncate">
                    {userData?.email}
                  </p>
                </div>
              )}
            </div>
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
