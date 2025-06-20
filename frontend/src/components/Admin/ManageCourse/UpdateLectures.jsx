import axiosInstance from "@/Axios/AxiosInstance";
import { useUserContext } from "@/context/UserContext";
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateLectures = ({ lecture, onClose }) => {
  const [lectureData, setLectureData] = useState({
    title: "",
    duration: "",
    videoUrl: null,
  });

  const { id } = useParams()
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");


  const { getLectures } = useUserContext()

  const videoRef = useRef(null);

  useEffect(() => {
    if (lecture) {
      setLectureData({
        title: lecture.title || "",
        duration: lecture.duration || "",
        videoUrl: null,
      });
    }
  }, [lecture]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLectureData((prev) => ({ ...prev, videoUrl: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    if (!previewUrl) return;
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const onLoadedMetadata = () => {
      const duration = formatDuration(videoElement.duration);
      setLectureData((prev) => ({ ...prev, duration }));
    };

    videoElement.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      videoElement.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [previewUrl]);

  const formatDuration = (seconds) => {
    const secNum = Math.floor(seconds);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum % 3600) / 60);
    const secs = secNum % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", lectureData.title);
      formData.append("duration", lectureData.duration);

      if (lectureData.videoUrl) {
        formData.append("videoUrl", lectureData.videoUrl);
      }

      await axiosInstance.put(
        `update-lecture/${lecture?._id}`,
        formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      getLectures(id)
      onClose();
    } catch (err) {
      setError("Failed to update lecture.");
      console.error("Failed to update lecture:", err);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Edit Lecture
        </h3>

        {error && <div className="text-red-600 mb-3 text-sm">{error}</div>}

        {isUploading && (
          <div className="mb-4">
            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
              <div
                className="bg-green-600 h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className="text-center text-sm text-gray-700 mt-1">
              Uploading: {uploadProgress}%
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={lectureData.title}
              onChange={(e) =>
                setLectureData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded dark:bg-gray-900 dark:text-white"
              required
              disabled={isUploading}
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Duration (auto-filled)
            </label>
            <input
              type="text"
              value={lectureData.duration}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-900 dark:text-white cursor-not-allowed"
            />
          </div>

          {/* Video file input */}
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Upload New Video (optional)
            </label>
            <input
              type="file"
              accept="video/mp4,video/webm"
              onChange={handleFileChange}
              className="text-sm"
              disabled={isUploading}
            />
          </div>

          {/* Preview video */}
          {previewUrl && (
            <video
              ref={videoRef}
              preload="metadata"
              src={previewUrl}
              controls
              className="w-full rounded mt-3"
            />
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Uploading...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLectures;
