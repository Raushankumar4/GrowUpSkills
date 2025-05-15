import RelatedCourses from "@/components/Course/RelatedCourses";
import { useUserContext } from "@/context/UserContext";
import { handlePay } from "@/razorpay/razorpay";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const CourseView = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  const { getSingleCourse, course, userData, getLectures, lectures } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getSingleCourse(courseId), getLectures(courseId)]);
      setLoading(false);
    };
    fetchData();
  }, [courseId]);

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsVideoOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsVideoOpen(false);
  };

  const handleCourseDelete = () => {
    if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      navigate("/dashboard/manage-courses");
    }
  };

  const handleLectureEdit = (lectureId) => {
    console.log("Edit Lecture", lectureId);
    // navigate(`/dashboard/edit-lecture/${lectureId}`)
  };

  const handleLectureDelete = (lectureId) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      console.log("Delete Lecture", lectureId);
      // call delete lecture API here
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-200 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl pt-20 mx-auto p-6 min-h-screen dark:bg-gray-900 flex flex-col md:flex-row gap-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-30 right-30  dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 py-1 px-3 rounded-2xl shadow-sm"
        >
          ← Back
        </button>
        {/* Sidebar */}
        <div className="w-full md:w-1/3 p-4">
          <img className="w-full h-64 object-cover rounded-lg shadow-md mb-4" src={course?.imageUrl} alt="Course" />

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Price: ₹ {course.price}
            </h3>

            {userData?.purchasedCourses?.includes(course._id) ? (
              <button
                onClick={() => navigate(`/study/${course._id}`)}
                className="bg-[#AD46FF] hover:bg-[#ac46ffd2] text-white font-bold py-2 px-4 rounded mt-4 w-full"
              >
                Study Now
              </button>
            ) : (
              <button
                onClick={() =>
                  handlePay(course?.price?.toFixed(2), course._id, userData?._id, userData)
                }
                className="bg-[#AD46FF] hover:bg-[#ac46ffd2] text-white font-bold py-2 px-4 rounded mt-4 w-full"
              >
                Enroll Now
              </button>
            )}
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(course?.courseTag) &&
              course?.courseTag[0]?.split(",")?.map((tag) => (
                <span
                  key={tag}
                  className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-emerald-900 dark:text-emerald-300"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4 relative">
          <div className="absolute top-4 right-4 flex gap-4">
            <button
              onClick={() => navigate(`/dashboard/manage-courses/edit/${course._id}`)}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <FaEdit className="mr-1" /> Edit
            </button>
            <button
              onClick={handleCourseDelete}
              className="text-red-600 hover:text-red-800 flex items-center"
            >
              <FaTrashAlt className="mr-1" /> Delete
            </button>
          </div>

          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{course?.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{course?.description}</p>

          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">Instructor:</h4>
          <p className="text-gray-600 dark:text-gray-300">{course?.instructor}</p>

          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">Language:</h4>
          <p className="text-gray-600 dark:text-gray-300">{course?.language}</p>

          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">Course Content:</h4>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            {course?.topics[0]?.split(",")?.map((topic, i) => <li key={i}>{topic}</li>)}
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">What You'll Learn:</h4>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            {course?.overview[0]?.split(",")?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          {/* Lecture Section */}
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Lectures
            </h4>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden divide-y dark:divide-gray-700">
              {lectures?.map((lecture) => (
                <div
                  key={lecture._id}
                  className="px-4 py-3 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() =>
                      handleVideoClick(`http://localhost:8080/stream/${lecture?.videoUrl.split("/").pop()}`)
                    }
                  >
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{lecture?.title}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <button
                      onClick={() => handleLectureEdit(lecture._id)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleLectureDelete(lecture._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
              {lectures?.length === 0 && (
                <div className="text-gray-500 text-center py-4">No lectures uploaded yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-3xl relative">
            <button
              onClick={closeVideoModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
            >
              ×
            </button>
            <video controls src={selectedVideo} className="w-full h-96 rounded-md" />
          </div>
        </div>
      )}

      {/* Related Courses */}
      <div className="mb-10">
        <RelatedCourses currentCourseId={course?._id} currentTags={course?.courseTag} />
      </div>
    </>
  );
};

export default CourseView;
