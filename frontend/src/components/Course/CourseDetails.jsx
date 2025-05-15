import { useUserContext } from "@/context/UserContext";
import { handlePay } from "@/razorpay/razorpay";
import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import RelatedCourses from "./RelatedCourses";

const CourseDetails = () => {
  const { courseId } = useParams()
  const [loading, setLoading] = React.useState(true);
  const handleNavigate = useNavigate()

  const { getSingleCourse, course, userData } = useUserContext()
  console.log("CourseDeatails", userData);


  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([getSingleCourse(courseId)]);
      setLoading(false);
    };

    fetchAll();
  }, [courseId]);

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
              Price:  ₹ {course.price}
            </h3>
            {
              userData?.purchasedCourses?.includes(course._id) ? <button
                onClick={() => {
                  handleNavigate(`/study/${course?._id}`)
                }} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mt-4">
                Study Now
              </button> : <button onClick={() => handlePay(course?.price?.toFixed(2), course?._id, userData?._id, userData)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mt-4">
                Enroll Now
              </button>
            }
          </div>

          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tags:</h4>
          <div className="flex flex-wrap mt-2">
            {Array.isArray(course?.courseTag) && course?.courseTag[0]?.split(",")?.map((tag) => (
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


          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {course?.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{course?.description}</p>

          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            Instructor: {course?.instructor}
          </h4>

          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            Language:
          </h4>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{course.language}</p>

          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            Course Content:
          </h4>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
            {Array.isArray(course?.topics)
              && course?.topics[0]?.split(",")?.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            What You'll Learn:
          </h4>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
            {Array.isArray(course?.overview) &&
              course.overview[0].split(",").map((item, index) => (
                <li key={index}>{item}</li>
              ))}

          </ul>
        </div>


      </div>
      <div className="mb-10">
        <RelatedCourses currentCourseId={course?._id} currentTags={course?.courseTag} />
      </div>
    </>
  );
};

export default CourseDetails;
