import React, { useEffect } from "react";
import { ArrowPathIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const DashboardContent = () => {
  const { myCourse, getMyCourses, getCourseProgress, courseProgress } =
    useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    getMyCourses();
  }, []);

  useEffect(() => {
    if (!myCourse || myCourse.length === 0) return;

    myCourse.forEach((course) => {
      if (course?._id) {
        getCourseProgress(course?._id);
      }
    });
  }, [myCourse]);

  const handleDownloadCertificate = (courseId) => {
    console.log("Downloading certificate for:", courseId);
  };

  return (
    <div className="flex-1 bg-white p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Courses */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {myCourse?.length > 0 ? (
              <>
                Continue <span className="text-purple-600">Learning</span>
              </>
            ) : (
              <>
                No Courses Yet.{" "}
                <span className="text-purple-600">Get Started!</span>
              </>
            )}
          </h2>

          {myCourse?.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {myCourse.map((course, index) => {
                const progress = courseProgress?.percentage || 0;

                return (
                  <div
                    key={index}
                    onClick={() => navigate(`/study/${course?._id}`)}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4 border border-gray-100"
                  >
                    <div className="w-full aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
                      <img
                        src={
                          course?.imageUrl ||
                          "https://via.placeholder.com/300x180?text=Course+Image"
                        }
                        alt="Course"
                        className="w-full h-full object-fit"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">
                      {course?.title || "Untitled Course"}
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
                        className="mt-3 w-full px-4 py-2 bg-purple-600 text-white text-sm rounded-xl hover:bg-purple-700 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadCertificate(course?._id);
                        }}
                      >
                        Download Certificate
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center bg-purple-50 border border-purple-100 rounded-xl p-6 mt-4 sm:mt-8">
              <img
                src="https://via.placeholder.com/150x100?text=No+Courses"
                alt="No Courses"
                className="w-32 h-auto mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                You haven’t enrolled in any courses yet!
              </h3>
              <p className="text-gray-500 mb-4 text-sm sm:text-base">
                Start learning by exploring our wide range of courses.
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

        {/* Right Side: Classes & Updates */}
        {myCourse.length < 0 && (
          <div className="mt-6 lg:mt-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Today’s <span className="text-purple-600">Classes</span>
              </h2>
              <div className="flex space-x-2">
                <button className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-full">
                  <ArrowPathIcon className="w-5 h-5" />
                </button>
                <button className="p-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-full">
                  <CalendarDaysIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-500">No Classes Scheduled Today.</p>
            </div>

            <h2 className="mt-8 text-lg font-semibold text-gray-800">
              Class <span className="text-purple-600">Updates</span>
            </h2>
            <div className="bg-gray-50 p-4 mt-2 rounded-lg shadow-sm">
              <p className="text-gray-500">No New Updates.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
