import React from "react";

const CourseItem = ({ course, userData, navigate, handlePay }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col"
    >
      <div className="h-40 bg-gray-100 rounded-t-lg flex items-center justify-center overflow-hidden">
        <img className="h-full w-full object-cover" src={course?.imageUrl} alt="" />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{course.title}</h3>
        <p className="text-xs text-gray-500 capitalize mb-1">{course.category}</p>
        <p className="text-sm text-gray-600 line-clamp-3 mb-2 flex-1">{course.description}</p>
        <p className="text-blue-600 font-bold text-md mb-4">₹{course.price}</p>

        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <button
            disabled={userData?.purchasedCourses?.includes(course._id)}
            onClick={() => handlePay(course.price.toFixed(2), course._id, userData?._id, userData)}
            className={`w-full sm:w-auto px-4 py-2 rounded font-medium text-white transition ${userData?.purchasedCourses?.includes(course._id)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {userData?.purchasedCourses?.includes(course._id)
              ? "Already Purchased"
              : "Enroll Now"}
          </button>

          {userData?.purchasedCourses?.includes(course._id) && (
            <button
              onClick={() => navigate(`/courses/${course._id}`)}
              className="w-full sm:w-auto px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
            >
              View Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
