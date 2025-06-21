import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { handlePay } from "./razorpay";
import CourseItem from "@/components/Course/CourseItem";
import WithPopularLabel from "@/components/Admin/HOC/WithPopularLabel";
import { SlidersHorizontal } from "lucide-react";
import Loading from "@/components/Loading/Loading";

const CourseCard = () => {
  const { courses, getCourses, userData } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([getCourses()]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const categories = [
    "All",
    ...new Set(courses?.map((course) => course.category)),
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <section className="px-4 sm:px-6 lg:px-10 pt-24 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          🎓 Explore Internship Courses
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-base">
          Industry-ready skills, real-world projects, and career-building
          certifications.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-10">
        <label className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
          <SlidersHorizontal className="w-4 h-4 text-sky-500" />
          Filter by Category:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-sm transition"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center col-span-full mt-10">
          <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">
            🚫 No courses found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.map((course) => {
            const CourseWithLabel = WithPopularLabel(CourseItem);
            return (
              <div
                key={course?._id}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <CourseWithLabel
                  key={course._id}
                  course={course}
                  userData={userData}
                  navigate={navigate}
                  handlePay={handlePay}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CourseCard;
