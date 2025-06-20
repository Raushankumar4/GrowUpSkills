import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UploadLecture from "./UploadLecture";

const TabNavigation = ({ activeTab, onTabChange }) => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-6 p-4">

      <div className="flex flex-wrap justify-center gap-4">
        {["update-course", "manage-lectures"].map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${activeTab === tab
              ? "bg-purple-700 text-white shadow"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              }`}
          >
            {tab === "update-course" ? "Update Course" : "Manage Lectures"}
          </button>
        ))}

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 rounded-full font-medium bg-green-600 hover:bg-green-700 text-white transition-colors shadow"
        >
          + Add Lecture
        </button>
      </div>

      {showModal && (
        <UploadLecture courseId={id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default TabNavigation;
