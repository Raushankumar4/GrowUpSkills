import { useUserContext } from "@/context/UserContext";
import { handlePay } from "@/razorpay/razorpay";
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaStar,
  FaCertificate,
  FaPlay,
  FaVideo,
  FaClock,
  FaShareAlt,
  FaLink,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import RelatedCourses from "./RelatedCourses";
import { useDeleteLecture } from "@/hooks/useDeletelecture";
import Loading from "../Loading/Loading";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(null);
  const [activeLectureId, setActiveLectureId] = useState(null);
  const [moduleData, setModuleData] = useState([]);
  const deleteLecture = useDeleteLecture(courseId);
  const handleNavigate = useNavigate();
  const { getSingleCourse, course, userData, lectures, getLectures } =
    useUserContext();

  const isAdmin = userData?.role === "Admin";
  const hasAccess = isAdmin || userData?.purchasedCourses?.includes(course._id);

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([getSingleCourse(courseId), getLectures(courseId)]);
      setLoading(false);
    };
    fetchAll();
  }, [courseId]);

  useEffect(() => {
    if (course?.topics?.length) {
      const parsedModules = parseModulesFromTopics(course.topics);
      setModuleData(parsedModules);
    }
  }, [course]);

  const parseModulesFromTopics = (topicsArray) => {
    const modules = [];
    let currentModule = null;
    topicsArray?.[0]?.split(",")?.forEach((item) => {
      const trimmed = item.trim();
      if (/^Module\s\d+:/i.test(trimmed)) {
        if (currentModule) modules.push(currentModule);
        currentModule = { title: trimmed, topics: [] };
      } else if (currentModule) {
        currentModule.topics.push(trimmed);
      }
    });
    if (currentModule) modules.push(currentModule);
    return modules;
  };

  const benefits = [
    { icon: <FaCertificate />, text: "Certificate of Completion" },
    { icon: <FaVideo />, text: "Watch on mobile & TV" },
    { icon: <FaClock />, text: "Lifetime access" },
    { icon: <FaPlay />, text: "Hands-on Practice" },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {course?.title}
          <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded ml-2">
            Bestseller
          </span>
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg mb-3">
          {course?.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <FaStar className="text-gray-300" />
          </div>
          <span>4.7 (1,593 reviews)</span>
          <span>• Last updated 06/2025</span>
        </div>

        <p className="text-sm text-gray-500 mb-6">👨‍🎓 1523 students enrolled</p>

        {/* Instructor & Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
              Instructor
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {course?.instructor}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
              Language
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {course.language}
            </p>
          </div>
        </div>

        {/* Modules Accordion */}
        <div className="mb-10">
          <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Course Modules
          </h4>
          <div className="space-y-4">
            {moduleData?.length > 0 ? (
              moduleData.map((mod, index) => (
                <div
                  key={index}
                  className="border rounded-xl bg-white dark:bg-zinc-800 shadow"
                >
                  <button
                    className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-semibold text-gray-800 dark:text-white bg-gray-100 dark:bg-zinc-700"
                    onClick={() =>
                      setExpandedModuleIndex(
                        index === expandedModuleIndex ? null : index
                      )
                    }
                  >
                    {mod.title}
                    {expandedModuleIndex === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                  {expandedModuleIndex === index && (
                    <ul className="p-4 space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      {mod.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <FaPlay className="text-purple-500" /> {topic.trim()}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No modules found.
              </p>
            )}
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
            What You’ll Learn
          </h4>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
            {course?.overview[0]?.split(",")?.map((point, i) => (
              <li key={i}>{point.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Certificate Info */}
        <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 rounded-lg p-4 mb-8 shadow-md">
          <FaCertificate className="text-purple-600 dark:text-purple-300 inline mr-2" />
          <span className="text-sm text-purple-700 dark:text-purple-200 font-medium">
            Certificate of Completion awarded after finishing the course
          </span>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
            Course Benefits
          </h4>
          <ul className="space-y-2 text-sm">
            {benefits.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <span className="text-purple-600 dark:text-purple-400">
                  {item.icon}
                </span>{" "}
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Share Buttons */}
        <div className="flex gap-2 mb-10">
          <button className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center gap-1">
            <FaShareAlt /> Share
          </button>
          <button
            onClick={handleCopyLink}
            className="text-sm px-3 py-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white rounded flex items-center gap-1"
          >
            <FaLink /> Copy Link
          </button>
        </div>

        {/* Lectures Section */}
        <div className="mb-10">
          <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Course Lectures
          </h4>
          <div className="space-y-6">
            {lectures?.length > 0 ? (
              lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-zinc-700"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaVideo className="text-purple-500" /> {lecture.title}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <FaClock /> {lecture.duration}
                      </p>
                    </div>
                    {hasAccess && (
                      <button
                        onClick={() =>
                          setActiveLectureId((prev) =>
                            prev === lecture._id ? null : lecture._id
                          )
                        }
                        className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-md transition"
                      >
                        {activeLectureId === lecture._id ? "Hide" : "Watch"}
                      </button>
                    )}
                  </div>
                  {activeLectureId === lecture._id && hasAccess && (
                    <div className="mt-4 space-y-4">
                      <video
                        controls
                        className="w-full rounded-md shadow-md max-h-[400px]"
                      >
                        <source
                          src={`${import.meta.env.VITE_SERVER}${
                            lecture?.videoUrl
                          }`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      {isAdmin && (
                        <div className="flex gap-4">
                          <button
                            onClick={() =>
                              console.log("Edit clicked for:", lecture)
                            }
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() =>
                              deleteLecture(lecture?._id, lecture.order)
                            }
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
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
              <p className="text-gray-600 dark:text-gray-300">
                No lectures available yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Right Card */}
      <div className="lg:sticky lg:top-28 h-fit">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 p-6">
          <img
            className="w-full h-52 object-cover rounded-xl mb-4 shadow-sm"
            src={course?.imageUrl}
            alt="Course Thumbnail"
          />
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ₹ {course.price}
          </h3>
          {hasAccess ? (
            <button
              onClick={() => handleNavigate(`/study/${course._id}`)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-lg transition"
            >
              Start Learning
            </button>
          ) : (
            <button
              onClick={() =>
                handlePay(
                  course?.price?.toFixed(2),
                  course?._id,
                  userData?._id,
                  userData
                )
              }
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-lg transition"
            >
              Enroll Now
            </button>
          )}
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-3">
            30-Day Money-Back Guarantee · Full Lifetime Access
          </p>

          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              This Course Includes:
            </h4>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(course?.courseTag) &&
                course.courseTag[0]?.split(",")?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses */}
      <div className="col-span-full mt-20">
        <RelatedCourses
          currentCourseId={course?._id}
          currentTags={course?.courseTag}
        />
      </div>
    </div>
  );
};

export default CourseDetails;
