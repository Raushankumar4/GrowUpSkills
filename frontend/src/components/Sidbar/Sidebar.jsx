import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Megaphone,
  BookOpen,
  FileText,
  BadgeCheck,
  ShoppingCart,
  Settings,
  Users,
  PlusSquare,
  Pencil,
  ListChecks,
  Database,
  CreditCard,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import clsx from "clsx";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userData, fetchProfile } = useUserContext();

  useEffect(() => {
    fetchProfile();
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
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard",
    },
    {
      name: "Announcements",
      icon: <Megaphone size={18} />,
      path: "/dashboard/announcements",
    },
    {
      name: "My Courses",
      icon: <BookOpen size={18} />,
      path: "/dashboard/course",
    },
    {
      name: "Exams",
      icon: <FileText size={18} />,
      path: "/dashboard/my-exams",
    },
    {
      name: "Certificates",
      icon: <BadgeCheck size={18} />,
      path: "/dashboard/certificates",
    },
    {
      name: "My Purchases",
      icon: <ShoppingCart size={18} />,
      path: "/dashboard/purchase",
    },
    {
      name: "Settings",
      icon: <Settings size={18} />,
      path: "/dashboard/settings",
    },
  ];

  const adminMenuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard",
    },
    {
      name: "User Management",
      icon: <Users size={18} />,
      path: "/dashboard/user-management",
    },
    {
      name: "Add Course",
      icon: <PlusSquare size={18} />,
      path: "/dashboard/create-course",
    },
    {
      name: "Add Exam",
      icon: <Pencil size={18} />,
      path: "/dashboard/create-exam",
    },
    {
      name: "Manage Courses",
      icon: <ListChecks size={18} />,
      path: "/dashboard/manage-courses",
    },
    {
      name: "Analytics",
      icon: <Database size={18} />,
      path: "/dashboard/analytics",
    },
    {
      name: "Payment History",
      icon: <CreditCard size={18} />,
      path: "/dashboard/payment-history",
    },
    {
      name: "Revenue",
      icon: <DollarSign size={18} />,
      path: "/dashboard/revenue",
    },
    {
      name: "Settings",
      icon: <Settings size={18} />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div
      className={clsx(
        "z-50 bg-white h-full border-r border-sky-200 shadow-md duration-300 p-4 relative",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Toggle Button */}
      {!isSmallScreen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 right-[10px] bg-sky-600 text-white p-1 rounded-full shadow-md"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      )}

      {/* Logo */}
      <Link
        to="/"
        className={clsx(
          "text-2xl font-bold text-sky-700 mb-6 block transition-all",
          !isOpen && "hidden"
        )}
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
              onClick={() => window.innerWidth < 640 && setIsOpen(false)}
              className={clsx(
                "flex items-center px-3 py-2 rounded-lg transition-all",
                pathname.startsWith(item.path)
                  ? "bg-sky-500 text-white font-medium"
                  : "hover:bg-sky-100 text-gray-700"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {isOpen && <span className="truncate">{item.name}</span>}
            </Link>
          ))}

          {/* Profile */}
          <div
            onClick={() => navigate("/dashboard/profile")}
            className="flex items-center space-x-3 mt-4 cursor-pointer p-2 rounded-lg hover:bg-sky-100"
          >
            <img
              src={userData?.photo || userData?.avatar}
              className="w-10 h-10 rounded-full object-cover"
              alt="profile"
            />
            {isOpen && (
              <div className="truncate">
                <h1 className="text-sm font-semibold">
                  {userData?.username || userData?.displayName}
                </h1>
                <p className="text-xs text-gray-500">{userData?.email}</p>
              </div>
            )}
          </div>
        </ul>
      )}

      {/* Admin Panel */}
      {userData?.role === "Admin" && (
        <>
          <hr className="my-4 border-sky-200" />
          {isOpen && (
            <h2 className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              Admin Panel
            </h2>
          )}
          <ul className="space-y-2">
            {adminMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => window.innerWidth < 640 && setIsOpen(false)}
                className={clsx(
                  "flex items-center px-3 py-2 rounded-lg transition-all",
                  pathname.startsWith(item.path)
                    ? "bg-sky-500 text-white font-medium"
                    : "hover:bg-sky-100 text-gray-700"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {isOpen && <span className="truncate">{item.name}</span>}
              </Link>
            ))}

            {/* Profile */}
            <div
              onClick={() => navigate("/dashboard/profile")}
              className="flex items-center mt-4 space-x-3 cursor-pointer p-2 rounded-lg hover:bg-sky-100"
            >
              <img
                src={userData?.avatar || userData?.photo}
                className="w-10 h-10 rounded-full object-cover"
                alt="profile"
              />
              {isOpen && (
                <div className="truncate">
                  <h1 className="text-sm font-semibold">
                    {userData?.username || userData?.displayName}
                  </h1>
                  <p className="text-xs text-gray-500">{userData?.email}</p>
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
