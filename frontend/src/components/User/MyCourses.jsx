import { useUserContext } from "@/context/UserContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { myCourse, getMyCourses, getCourseProgress, courseProgress } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    getMyCourses();
  }, []);

  useEffect(() => {
    if (!myCourse || myCourse.length === 0) return;
    myCourse.forEach((course) => {
      if (course?._id) getCourseProgress(course._id);
    });
  }, [myCourse]);

  const handleDownloadCertificate = (courseId) => {
    console.log("Downloading certificate for:", courseId);
    // Add real logic here (API call or file download)
  };

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My <span className="text-purple-600">Courses</span></h1>

      {myCourse?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourse.map((course, index) => {
            const progress = courseProgress?.[course._id]?.percentage || 0;

            return (
              <div
                key={index}
                onClick={() => navigate(`/study/${course._id}`)}
                className="cursor-pointer bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition p-4 flex flex-col"
              >
                <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={course.thumbnail || "https://via.placeholder.com/300x180?text=Course+Image"}
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-base mb-1">
                  {course.title || "Untitled Course"}
                </h3>

                <div className="w-full bg-purple-200 h-2 rounded-full mb-1">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-right text-xs text-purple-600">
                  {progress === 100 ? "Completed" : `${progress}%`}
                </p>

                {progress === 100 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadCertificate(course._id);
                    }}
                    className="mt-3 px-4 py-2 bg-purple-600 text-white text-sm rounded-xl hover:bg-purple-700 transition"
                  >
                    Download Certificate
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-purple-50 border border-purple-100 rounded-xl p-6 mt-4">
          <img
            src="https://via.placeholder.com/150x100?text=No+Courses"
            alt="No Courses"
            className="w-32 h-auto mb-4"
          />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
            You haven’t enrolled in any courses yet!
          </h3>
          <p className="text-gray-500 mb-4 text-sm sm:text-base">
            Browse our course library and start your learning journey today.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="px-5 py-2 bg-purple-600 text-white text-sm sm:text-base rounded-full hover:bg-purple-700 transition"
          >
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
