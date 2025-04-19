import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../Axios/AxiosInstance';
import {
  CheckCircleIcon,
  PlayCircleIcon,
  ClockIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const GetSingleCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [courseProgress, setCourseProgress] = useState({});
  const [videoDuration, setVideoDuration] = useState('');
  const videoRef = useRef(null);

  const getCourse = async () => {
    try {
      const { data } = await axiosInstance.get(`course?id=${courseId}`);
      setCourse(data?.course || {});
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const getLectures = async () => {
    try {
      const { data } = await axiosInstance.get(`lectures/${courseId}`);
      setLectures(data?.lectures || []);
      if (data?.lectures?.length > 0) {
        setSelectedLecture(data.lectures[0]);
      }
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  const markasCompletedLecture = async (courseId, lectureOrder) => {
    try {
      await axiosInstance.post("add-course-progress", {
        courseId, lectureOrder
      });
      getCourseProgress();
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseProgress = async () => {
    try {
      const { data } = await axiosInstance.get(courseId);
      setCourseProgress(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleLoadedMetadata = () => {
    const duration = videoRef.current.duration;
    setVideoDuration(formatTime(duration));
  };

  useEffect(() => {
    getCourse();
    getLectures();
    getCourseProgress();
  }, [courseId]);

  return (
    <div className="bg-gradient-to-br from-[#f8fafc] to-white min-h-screen px-4 md:px-8 py-10 ">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Course Info */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 flex justify-center items-center gap-2">
            <AcademicCapIcon className="h-8 w-8 text-indigo-500" />
            {course?.title}
          </h1>
          <p className="text-gray-500 mt-2 text-lg max-w-2xl mx-auto">{course?.description}</p>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: 'Completed',
              value: courseProgress?.completedLectures?.length || 0,
              icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
              color: 'bg-green-50 text-green-600',
            },
            {
              label: 'Remaining',
              value: courseProgress?.remainingCount || 0,
              icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
              color: 'bg-yellow-50 text-yellow-600',
            },
            {
              label: 'Total',
              value: courseProgress?.totalLectures || 0,
              icon: <PlayCircleIcon className="h-6 w-6 text-blue-500" />,
              color: 'bg-blue-50 text-blue-600',
            },
            {
              label: courseProgress?.percentage === 100 ? '🎓 Completed' : 'Progress',
              value: `${courseProgress?.percentage || 0}%`,
              icon: <AcademicCapIcon className="h-6 w-6 text-purple-500" />,
              color: 'bg-purple-50 text-purple-600',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border border-gray-100 shadow-sm ${card.color} backdrop-blur-sm transition hover:shadow-md`}
            >
              <div className="flex flex-col items-center space-y-2">
                {card.icon}
                <p className="text-sm font-semibold">{card.label}</p>
                <p className="text-xl font-bold">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Lecture List */}
          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 md:col-span-1">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📚 Lectures</h3>
            <ul className="space-y-2 overflow-y-auto max-h-[65vh]">
              {lectures.map((lecture, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition
                    ${selectedLecture?.videoUrl === lecture?.videoUrl
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-700'
                      : 'hover:bg-gray-50 border-gray-200 text-gray-700'
                    }`}
                >
                  <span>🎬 {lecture?.title}</span>
                  {courseProgress?.completedLectures?.includes(lecture.order) && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Video Player */}
          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🎥 Watch Lecture</h3>
            {selectedLecture?.videoUrl ? (
              <div>
                <p className="text-gray-600 mb-2">⏱ Duration: {videoDuration || "Loading..."}</p>
                <div className="aspect-video rounded overflow-hidden border border-gray-200">
                  <video
                    ref={videoRef}
                    controls
                    onEnded={() => markasCompletedLecture(courseId, selectedLecture.order)}
                    onLoadedMetadata={handleLoadedMetadata}
                    src={`https://skillbridge-backend-1.onrender.com/stream/${selectedLecture?.videoUrl.split('/').pop()}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-400 py-8">No video selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetSingleCourse;
