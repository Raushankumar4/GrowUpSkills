import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

const RelatedCourses = ({ currentCourseId, currentTags }) => {
  const { courses, getCourses } = useUserContext();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      await getCourses();
    };

    fetchRelated();
  }, []);

  useEffect(() => {
    if (courses.length && currentTags) {
      const tagsArray = currentTags[0]?.split(",").map(tag => tag.trim().toLowerCase());

      const filtered = courses
        .filter(course => course._id !== currentCourseId)
        .filter(course => {
          const courseTags = course.courseTag?.[0]?.split(",").map(tag => tag.trim().toLowerCase());
          return courseTags?.some(tag => tagsArray.includes(tag));
        })
        .slice(0, 4);

      setRelated(filtered);
    }
  }, [courses, currentTags, currentCourseId]);

  if (related.length === 0) {
    return (
      <div className="w-full md:w-1/4 p-4 mt-8 md:mt-0">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Related Courses</h3>
        <p className="text-gray-600 dark:text-gray-300">No related courses found.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 px-6">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Related Courses</h3>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {related.map(course => (
          <div
            key={course._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="h-40 w-full object-cover rounded-md mb-3"
            />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {course.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {course.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-md font-bold text-green-600 dark:text-green-400">
                ₹{course.price}
              </span>
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to={`/course/${course._id}`}
                className="bg-[#009966] text-white text-sm px-6 py-3 rounded hover:bg-blue-700 transition"
              >
                View
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;
