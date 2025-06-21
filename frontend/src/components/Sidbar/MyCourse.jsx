import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { CircleCheck, Clock } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { myCourse: courses, courseProgress, getMyCourses } = useUserContext();
  const [filter, setFilter] = useState("active");
  const naviagte = useNavigate();

  useEffect(() => {
    getMyCourses();
  }, [getMyCourses]);

  const filteredCourses = courses?.filter(() => {
    const percentage = courseProgress?.percentage || 0;
    return filter === "active" ? percentage < 100 : percentage === 100;
  });

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-900 px-4 md:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {filter === "active" ? "📘 Active Courses" : "✅ Completed Courses"}
          <span className="ml-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            ({filteredCourses?.length || 0})
          </span>
        </h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-sky-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sky-700 dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        >
          <option value="active">Active Courses</option>
          <option value="completed">Completed Courses</option>
        </select>
      </div>

      {!filteredCourses || filteredCourses.length === 0 ? (
        <div className="text-center text-zinc-500 dark:text-zinc-400 text-lg mt-24">
          No {filter === "active" ? "active" : "completed"} courses found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const percentage = courseProgress?.percentage || 0;

            return (
              <div
                onClick={() => naviagte(`/study/${course?._id}`)}
                key={course?._id}
                className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src={
                      course.imageUrl || "https://via.placeholder.com/400x200"
                    }
                    alt={course.title}
                    className="w-full h-44 object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {course.title || "Untitled Course"}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Web Development - June Batch 2024
                  </p>

                  <div className="mt-auto">
                    <div className="h-2 w-full bg-sky-200 dark:bg-zinc-700 rounded-full">
                      <div
                        className="h-2 bg-sky-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-right mt-1 font-medium text-sky-600 dark:text-sky-400 flex items-center justify-end gap-1">
                      {percentage === 100 ? (
                        <>
                          <CircleCheck className="w-4 h-4" /> Completed 100%
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" /> {percentage} %
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
