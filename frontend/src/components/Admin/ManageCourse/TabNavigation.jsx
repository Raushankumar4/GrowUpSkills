import React from "react";

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center mb-6 space-x-4">
      {["update-course", "add-lectures"].map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 rounded font-semibold transition-all duration-200 ${activeTab === tab
              ? "bg-purple-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            }`}
        >
          {tab === "update-course" ? "Update Course" : "Add Lectures"}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
