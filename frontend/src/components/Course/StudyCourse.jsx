import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Axios/AxiosInstance";
import VideoJS from "../VideoPlayer/VideoPlayer";
import "../VideoPlayer/VideoPlayer.css";
import { useUserContext } from "../../context/UserContext";
import {
  CheckCheck,
  MessageCircle,
  PlaySquare,
  GraduationCap,
} from "lucide-react";
import { showErrorToast } from "@/utils/ToastSimple";
import Loading from "../Loading/Loading";

const StudyCourse = () => {
  const { courseId } = useParams();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [courseProgress, setCourseProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const playerRef = useRef(null);

  const { getSingleCourse, course, getLectures, lectures } = useUserContext();

  const getSinleCourseProgress = async () => {
    try {
      const { data } = await axiosInstance.get(courseId);
      setCourseProgress(data);
    } catch (error) {
      showErrorToast("Error fetching course progress");
      console.error("Error fetching course progress:", error);
    }
  };

  const markAsCompletedLecture = async (courseId, lectureOrder) => {
    try {
      await axiosInstance.post("add-course-progress", {
        courseId,
        lectureOrder,
      });
      getSinleCourseProgress();
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: selectedLecture?.videoUrl
      ? [
          {
            src: `${
              import.meta.env.VITE_SERVER
            }/stream/${selectedLecture.videoUrl.split("/").pop()}`,
            type: "video/mp4",
          },
        ]
      : [],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("loadedmetadata", () => {
      setVideoDuration(formatTime(player.duration()));
    });
    player.on("ended", () => {
      markAsCompletedLecture(courseId, selectedLecture?.order);
    });
  };

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([
        getSingleCourse(courseId),
        getLectures(courseId),
        getSinleCourseProgress(),
      ]);
      setLoading(false);
    };
    fetchAll();
  }, [courseId]);

  if (!courseId || !course || !lectures) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-muted-foreground animate-pulse">
          No Course Selected
        </p>
      </div>
    );
  }

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen pt-16 bg-[#f5f7fa] dark:bg-[#0f172a] text-gray-900 dark:text-white">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-4">
        {/* Sidebar Lectures */}
        <div className="w-full lg:w-[28%] sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-800 rounded-2xl p-4">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-sky-600 dark:text-sky-400">
            <GraduationCap className="w-6 h-6" /> Lectures
          </h2>
          <ul className="space-y-2">
            {lectures.map((lecture, index) => (
              <li
                key={index}
                onClick={() => setSelectedLecture(lecture)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer text-sm font-medium transition border group
                ${
                  selectedLecture?.videoUrl === lecture?.videoUrl
                    ? "bg-sky-100 text-sky-800 border-sky-400 dark:bg-sky-700 dark:text-white"
                    : "hover:bg-gray-100 dark:hover:bg-slate-800 border-gray-300 dark:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <PlaySquare className="w-4 h-4 text-sky-500 group-hover:scale-110 transition" />
                  {lecture?.title}
                </div>
                {courseProgress?.completedLectures?.includes(lecture.order) && (
                  <CheckCheck className="w-4 h-4 text-green-500" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Video Player */}
          <div className="bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-800 rounded-2xl p-4">
            <h1 className="text-2xl font-semibold mb-4 text-sky-600 dark:text-sky-400">
              🎬 Watch: {selectedLecture?.title || "Select a Lecture"}
            </h1>
            {selectedLecture?.videoUrl ? (
              <div className="aspect-video overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
              </div>
            ) : (
              <p className="text-center py-16 text-gray-500 dark:text-gray-400">
                No video selected
              </p>
            )}
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon="✅"
              label="Completed"
              value={courseProgress?.completedLectures?.length || 0}
            />
            <StatCard
              icon="⏳"
              label="Remaining"
              value={courseProgress?.remainingCount || 0}
            />
            <StatCard
              icon="🎯"
              label="Progress"
              value={`${courseProgress?.percentage || 0}%`}
            />
            <StatCard
              icon="📚"
              label="Total"
              value={courseProgress?.totalLectures || lectures.length}
            />
          </div>

          {/* Comments */}
          <div className="bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-800 rounded-2xl p-4">
            <h3 className="text-xl font-bold mb-4 text-sky-600 dark:text-sky-400">
              💬 Comments
            </h3>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="p-3 bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
                >
                  <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                    Student {i + 1}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Great explanation. Very clear!
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              />
              <button className="px-4 py-2 flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm shadow">
                <MessageCircle className="w-4 h-4" /> Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Only one StatCard — cleaned up
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow border border-gray-200 dark:border-slate-700 text-center">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {icon} {label}
    </p>
    <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
      {value}
    </p>
  </div>
);

export default StudyCourse;
