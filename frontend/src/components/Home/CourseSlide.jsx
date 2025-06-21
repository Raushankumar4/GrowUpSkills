import React, { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useUserContext } from "@/context/UserContext";

const CourseSlide = () => {
  const { courses, getCourses } = useUserContext();

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <section className="py-20 px-6 md:px-14 bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <button className="mx-auto mb-4 flex items-center gap-2 px-5 py-2 border border-red-400 text-red-500 text-sm font-semibold rounded-full dark:border-red-500 dark:text-red-300 backdrop-blur-sm bg-white/70 dark:bg-white/5">
          <Sparkles className="w-4 h-4" />
          Explore Our Courses
        </button>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Mentor-Led Courses
        </h2>
        <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Build your skills through hands-on learning, live mentorship, and
          real-world projects.
        </p>
      </motion.div>

      {/* Course Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {courses.map((course) => (
          <a
            key={course._id}
            href={`/course-details/${course._id}`}
            className="group relative bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-zinc-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="relative w-full h-44 overflow-hidden rounded-t-3xl">
              <img
                src={course.imageUrl || "/placeholder.jpg"}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 line-clamp-1">
                👨‍🏫 {course.instructor || "By Expert Mentor"}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-800/40 dark:text-blue-300 rounded-full">
                  {course.category}
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-300 rounded-full">
                  {course.price ? `₹${course.price}` : "Free"}
                </span>
              </div>
            </div>
          </a>
        ))}
      </motion.div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12 text-center"
      >
        <a
          href="/courses"
          className="inline-block px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-full transition"
        >
          View All Courses →
        </a>
      </motion.div>
    </section>
  );
};

export default CourseSlide;
