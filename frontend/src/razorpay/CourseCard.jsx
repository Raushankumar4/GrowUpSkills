import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { handlePay } from "./razorpay";
import CourseItem from "@/components/Course/CourseItem";
import WithPopularLabel from "@/components/Admin/HOC/WithPopularLabel"


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
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-200 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }


  const categories = ["All", ...new Set(courses?.map(course => course.category))];

  const filteredCourses = selectedCategory === "All"
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10 pt-20 max-w-9xl mx-auto">
      {
        courses?.length >= 1 &&
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Courses</h2>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Filter by Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </>
      }


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses?.map((course) => {
          const CourseWithLabel = WithPopularLabel(CourseItem);

          return (
            <div key={course?._id} className="relative"> <CourseWithLabel
              key={course._id}
              course={course}
              userData={userData}
              navigate={navigate}
              handlePay={handlePay}
            /></div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseCard;
