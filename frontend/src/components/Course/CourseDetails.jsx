import { useUserContext } from "@/context/UserContext";
import { handlePay } from "@/razorpay/razorpay";
import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import RelatedCourses from "./RelatedCourses";
import { useDeleteLecture } from "@/hooks/useDeletelecture";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [activeLectureId, setActiveLectureId] = React.useState(null);
  const deleteLecture = useDeleteLecture(courseId);
  const handleNavigate = useNavigate();

  const { getSingleCourse, course, userData, lectures, getLectures } = useUserContext();

  const handleEditLecture = (lecture) => {
    console.log("Edit clicked for:", lecture);
    // Implement edit modal or navigation
  };

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([getSingleCourse(courseId), getLectures(courseId)]);
      setLoading(false);
    };
    fetchAll();
  }, [courseId]);

  const isAdmin = userData?.role === "Admin";
  const hasAccess = isAdmin || userData?.purchasedCourses?.includes(course._id);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-200 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl pt-20 mx-auto p-6 min-h-[110vh] dark:bg-gray-900 flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="w-full md:w-1/3 p-4">
          <img
            className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
            src={course?.imageUrl}
            alt="Course"
          />

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Price: ₹ {course.price}
            </h3>
            {hasAccess ? (
              <button
                onClick={() => handleNavigate(`/study/${course?._id}`)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Study Now
              </button>
            ) : (
              <button
                onClick={() =>
                  handlePay(course?.price?.toFixed(2), course?._id, userData?._id, userData)
                }
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Enroll Now
              </button>
            )}
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Course Includes:</h4>
          <div className="flex flex-wrap mt-2">
            {Array.isArray(course?.courseTag) &&
              course.courseTag[0]?.split(",")?.map((tag) => (
                <span
                  key={tag}
                  className="bg-emerald-100 text-emerald-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-emerald-900 dark:text-emerald-300"
                >
                  {tag}
                </span>
              ))}
          </div>

          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Student Reviews:</h4>
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg mt-2">
              <p className="text-gray-800 dark:text-gray-200">
                <strong>Alex:</strong> “Very clear explanations and useful examples.”
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-grow p-4 relative">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{course?.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{course?.description}</p>

          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            Instructor: {course?.instructor}
          </h4>

          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">Language:</h4>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{course.language}</p>

          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            Course Content:
          </h4>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
            {Array.isArray(course?.topics) &&
              course.topics[0]?.split(",")?.map((topic) => <li key={topic}>{topic}</li>)}
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            What You'll Learn:
          </h4>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
            {Array.isArray(course?.overview) &&
              course.overview[0].split(",").map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>

      {/* Lectures Section */}
      <div className="max-w-6xl mx-auto px-6">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">Lectures:</h4>

        <div className="mt-2 space-y-6">
          {lectures?.length > 0 ? (
            lectures.map((lecture) => (
              <div key={lecture._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                      {lecture.title}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Duration: {lecture.duration}
                    </p>
                  </div>

                  {hasAccess && (
                    <button
                      onClick={() =>
                        setActiveLectureId((prevId) =>
                          prevId === lecture._id ? null : lecture._id
                        )
                      }
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-3 py-1 rounded"
                    >
                      {activeLectureId === lecture._id ? "Hide" : "Watch"}
                    </button>
                  )}
                </div>

                {activeLectureId === lecture._id && hasAccess && (
                  <div className="mt-4 space-y-4">
                    <video
                      controls
                      className="w-full rounded-md"
                      preload="metadata"
                      style={{ maxHeight: "400px" }}
                    >
                      <source src={`http://localhost:8080${lecture?.videoUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Admin Only: Edit/Delete */}
                    {isAdmin && (
                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={() => handleEditLecture(lecture)}
                          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded"
                        >
                          <FaEdit /> Edit
                        </button>

                        <button
                          onClick={() => deleteLecture(lecture?._id, lecture.order)}
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-3 py-1 rounded"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {!hasAccess && (
                  <p className="italic text-gray-500 dark:text-gray-400 mt-2">
                    Enroll to access this lecture.
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-300">No lectures available yet.</p>
          )}
        </div>
      </div>

      {/* Related Courses */}
      <div className="mb-10">
        <RelatedCourses
          currentCourseId={course?._id}
          currentTags={course?.courseTag}
        />
      </div>
    </>
  );
};

export default CourseDetails;
