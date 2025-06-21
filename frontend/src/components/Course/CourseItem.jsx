import React from "react";
import { BookOpenCheck, ShoppingCart, Star } from "lucide-react";

const CourseItem = ({ course, userData, navigate, handlePay }) => {
  const isPurchased = userData?.purchasedCourses?.includes(course._id);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden border border-gray-200 dark:border-zinc-700">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={course?.imageUrl || "https://via.placeholder.com/400x200"}
          alt={course?.title || "Course Image"}
        />
        {course?.certificateAvailable && (
          <span className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-lg">
            🎓 Certificate
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
          {course.title}
        </h3>
        <p className="text-xs text-sky-500 font-medium mb-2 capitalize">
          {course.category}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {course?.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-sky-100 dark:bg-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {course.description}
        </p>

        {/* Price + Rating */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-sky-600">₹{course.price}</p>
          <div className="flex gap-0.5">
            {[...Array(4)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
              />
            ))}
            <Star className="w-4 h-4 text-yellow-400" />
          </div>
        </div>
        
        {/* Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button
            disabled={isPurchased}
            onClick={() =>
              handlePay(
                course.price.toFixed(2),
                course._id,
                userData?._id,
                userData
              )
            }
            className={`w-full sm:w-auto px-4 py-2 rounded-lg font-semibold transition text-white text-sm shadow-sm flex items-center justify-center gap-2 ${
              isPurchased
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isPurchased ? "Enrolled" : "Enroll Now"}
          </button>

          <button
            onClick={() => navigate(`/course-details/${course._id}`)}
            className="w-full sm:w-auto px-4 py-2 border border-sky-600 text-sky-600 dark:text-white rounded-lg hover:bg-sky-50 dark:hover:bg-zinc-800 transition text-sm font-semibold flex items-center justify-center gap-2"
          >
            <BookOpenCheck className="w-4 h-4" /> View
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
