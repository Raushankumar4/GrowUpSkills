import React from 'react';
import { useUserContext } from '../../context/UserContext';

const MyPurchase = () => {
  const { myCourse: courses } = useUserContext();

  return (
    <div className="w-full min-h-screen ">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-10 border-b pb-2">
        🛒 My Purchases <span className="text-purple-600">({courses?.length || 0})</span>
      </h2>

      {/* If No Purchases */}
      {(!courses || courses.length === 0) ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          <p className="text-xl font-medium">No courses found</p>
          <p className="text-sm mt-2">You haven’t purchased any course yet. Start learning today!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={course.image || "https://via.placeholder.com/400x200"}
                alt={course.title}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{course?.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Purchased on:{" "}
                  <span className="text-gray-700">
                    {new Date(course.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-lg font-bold text-purple-700">₹{course.price || '0.00'}</p>
                  <a
                    href={`/courses/${course._id}`}
                    className="text-sm text-purple-600 hover:text-purple-800 hover:underline"
                  >
                    View Course →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPurchase;
