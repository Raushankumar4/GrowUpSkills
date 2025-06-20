import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../Axios/AxiosInstance';
import {
  CheckCircleIcon,
  PlayCircleIcon,
  ClockIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import VideoJS from '../VideoPlayer/VideoPlayer';
import '../VideoPlayer/VideoPlayer.css';
import { useUserContext } from '../../context/UserContext';
import { PlayCircle } from 'lucide-react'

const StudyCourse = () => {
  const { courseId } = useParams();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [loading, setLoading] = useState(true)
  const playerRef = useRef(null);

  const { getCourseProgress, courseProgress, getSingleCourse, course, getLectures, lectures } = useUserContext()

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([getLectures(courseId), getCourseProgress(courseId),])
    }
    fetchAll()
  }, [courseId])


  const markAsCompletedLecture = async (courseId, lectureOrder) => {
    try {
      await axiosInstance.post("add-course-progress", {
        courseId,
        lectureOrder,
      });
      getCourseProgress(courseId);
    } catch (error) {
      console.error(error);
    }
  };



  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: selectedLecture?.videoUrl
      ? [
        {
          src: `${import.meta.env.VITE_SERVER}/stream/${selectedLecture.videoUrl.split('/').pop()}`,
          type: 'video/mp4',
        },
      ]
      : [],
  };


  const handlePlayerReady = (player) => {
    playerRef.current = player;


    player.on('loadedmetadata', () => {
      const duration = player.duration();
      setVideoDuration(formatTime(duration));
    });


    player.on('ended', () => {
      markAsCompletedLecture(courseId, selectedLecture?.order);

    });
  };

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([getSingleCourse(courseId),
      getLectures(courseId),
      getCourseProgress(courseId),])
      setLoading(false)
    }
    fetchAll()
  }, [courseId]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-200 animate-pulse">Loading...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 py-10 dark:bg-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Course Info */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white flex justify-center items-center gap-2">
            <AcademicCapIcon className="h-8 w-8 text-indigo-500 dark:text-indigo-300" />
            {course?.title}
          </h1>
          <p className="text-gray-500 mt-2 text-lg max-w-2xl mx-auto dark:text-gray-300">
            {course?.description}
          </p>
        </div>

        <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
          <div className="bg-green-100 dark:bg-green-800 p-3 rounded-lg text-green-800 dark:text-green-200 font-semibold shadow-sm">
            ✅ Completed: {courseProgress?.completedLectures?.length || 0}
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-800 p-3 rounded-lg text-yellow-800 dark:text-yellow-200 font-semibold shadow-sm">
            ⏳ Remaining: {courseProgress?.remainingCount || 0}
          </div>
          <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-lg text-blue-800 dark:text-blue-200 font-semibold shadow-sm">
            🎯 Progress: {courseProgress?.percentage || 0}%
          </div>
          <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-lg text-purple-800 dark:text-purple-200 font-semibold shadow-sm">
            📚 Total: {courseProgress?.totalLectures || lectures.length}
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[75vh]">
          {/* Lecture List (Left - Fixed Scroll) */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700 overflow-y-auto max-h-full md:col-span-1">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              📚 Lectures
            </h3>
            <ul className="space-y-2">
              {lectures.map((lecture, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition
                      ${selectedLecture?.videoUrl === lecture?.videoUrl
                      ? 'bg-indigo-50 dark:bg-indigo-700 border-indigo-400 text-indigo-700 dark:text-indigo-300'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 text-gray-700 dark:text-gray-300'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <PlayCircleIcon className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    <span className="text-sm">{lecture?.title}</span>

                    {videoDuration ? `Duration: ${videoDuration}` : "⏱ Loading..."}

                  </div>
                  {courseProgress?.completedLectures?.includes(lecture.order) && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Video + Comment (Right - Scrollable) */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700 overflow-y-auto max-h-full md:col-span-2">


            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  🎥 Watch Lecture
                </h3>
                {selectedLecture?.videoUrl ? (
                  <>
                    <div className="aspect-video rounded overflow-hidden border border-gray-200 dark:border-gray-700">

                      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-400 py-8 dark:text-gray-600">
                    No video selected
                  </p>
                )}
              </div>

              {/* Dummy Comment Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">💬 Comments</h4>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border dark:border-gray-700">
                      <p className="font-medium text-sm text-indigo-700 dark:text-indigo-300">Student {i + 1}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        This is a dummy comment for the lecture. Very informative!
                      </p>
                    </div>
                  ))}
                </div>

                {/* Comment input */}
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-grow w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                  />
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                  >
                    <PlayCircle className="h-5 w-5" />
                    Submit
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );



};

export default StudyCourse;
