import { useUserContext } from "@/context/UserContext";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import UpdateLectures from "./UpdateLectures";
import VideoJS from "@/components/VideoPlayer/VideoPlayer";
import { useDeleteLecture } from "@/hooks/useDeletelecture";
import ConfirmModal from "./ConfirmModal";


const ManageLectures = () => {
  const { id } = useParams();
  const { lectures, getLectures } = useUserContext();

  const [expandedLectureId, setExpandedLectureId] = useState(null);
  const [editingLecture, setEditingLecture] = useState(null);
  const [videoToShow, setVideoToShow] = useState(null);
  const [lectureToDelete, setLectureToDelete] = useState(null);

  const playerRef = useRef(null);

  const deleteLecture = useDeleteLecture(id);

  useEffect(() => {
    if (!id) return;
    getLectures(id);
  }, [id]);

  const handleToggle = (lectureId) => {
    setExpandedLectureId((prev) => (prev === lectureId ? null : lectureId));
  };

  const handleEdit = (lecture) => {
    setEditingLecture(lecture);
  };

  const handleConfirmDelete = () => {
    if (lectureToDelete) {
      deleteLecture(lectureToDelete._id, lectureToDelete.order);
      setLectureToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setLectureToDelete(null);
  };

  const videoJsOptions = videoToShow
    ? {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: `${import.meta.env.VITE_SERVER}${videoToShow}`,
          type: "video/mp4",
        },
      ],
    }
    : null;

  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow space-y-6 text-gray-900 dark:text-white min-h-screen">
      <h2 className="text-3xl font-bold">Manage Lectures</h2>

      {lectures && lectures.length > 0 ? (
        <div className="space-y-4">
          {lectures.map((lecture) => (
            <div
              key={lecture._id}
              className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800"
            >
              <div className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">{lecture.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Duration: {lecture.duration}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(lecture)}
                    className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setLectureToDelete(lecture)} 
                    className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleToggle(lecture._id)}
                    className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm rounded"
                  >
                    {expandedLectureId === lecture._id
                      ? "Hide Details"
                      : "Show Details"}
                  </button>
                </div>
              </div>

              {expandedLectureId === lecture._id && (
                <div className="bg-gray-50 dark:bg-gray-700 px-5 py-4 border-t border-gray-200 dark:border-gray-600">
                  <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                    Click the button below to view the lecture video.
                  </p>
                  <button
                    onClick={() => setVideoToShow(lecture.videoUrl)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded transition"
                  >
                    View Video
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-600 dark:text-red-400">No Lectures Found</p>
      )}

      {/* Edit Modal */}
      {editingLecture && (
        <UpdateLectures
          lecture={editingLecture}
          onClose={() => setEditingLecture(null)}
        />
      )}

      {/* Video Modal */}
      {videoToShow && videoJsOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full relative">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Lecture Video</h3>
              <button
                onClick={() => setVideoToShow(null)}
                className="text-red-500 hover:text-red-600 font-bold text-xl"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!lectureToDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the lecture "${lectureToDelete?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ManageLectures;
