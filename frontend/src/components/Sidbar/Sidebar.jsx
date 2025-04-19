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
} from "react-icons/fa";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Sidebar = ({ setActive }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Collapse and disable open on small screens
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
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Announcements", icon: <FaBullhorn /> },
    { name: "My Courses", icon: <FaBook /> },
    { name: "Calendar", icon: <FaCalendarAlt /> },
    { name: "Exams", icon: <FaFileAlt /> },
    { name: "Certificates", icon: <FaCertificate /> },
    { name: "My Purchases", icon: <FaShoppingCart /> },
    { name: "Profile", icon: <FaUser /> },
  ];

  const handleItemClick = (name) => {
    setActive(name);
    setActiveItem(name);
  };

  return (
    <div
      className={`${isOpen ? "w-64" : "w-20"
        } bg-white border-r border-purple-200 shadow-sm min-h-screen p-4 duration-300 relative`}
    >
      {/* Toggle button only on large screens */}
      {!isSmallScreen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 right-[-14px] bg-purple-600 text-white p-1 rounded-full z-10 shadow"
        >
          {isOpen ? (
            <ChevronLeftIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )}
        </button>
      )}

      {/* Logo */}
      <h1
        className={`text-2xl font-bold text-purple-700 mb-6 ${!isOpen && "hidden"
          }`}
      >
        YHills
      </h1>

      {/* Navigation */}
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => handleItemClick(item.name)}
            className={`flex items-center space-x-3 cursor-pointer px-3 py-3 rounded-lg transition-all duration-200
              ${activeItem === item.name
                ? "bg-purple-500 text-white font-semibold"
                : "hover:bg-purple-100 text-gray-700"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className={`${!isOpen && "hidden"} truncate`}>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
