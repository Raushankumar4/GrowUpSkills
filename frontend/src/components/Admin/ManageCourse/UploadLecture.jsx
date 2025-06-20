import React, { useRef, useState } from "react";
import axiosInstance from "@/Axios/AxiosInstance";
import { useUserContext } from "@/context/UserContext";

const UploadLecture = ({ courseId, onClose }) => {
  const [lectureData, setLectureData] = useState({
    title: "",
    duration: "",
    videoUrl: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoPreview, setVideoPreview] = useState(null);

  const { getLectures } = useUserContext();

  const videoRef = useRef();

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    const file = files?.[0];

    if (name === "videoUrl" && file) {
      setLectureData((prev) => ({ ...prev, videoUrl: file }));
      setVideoPreview(URL.createObjectURL(file));
    } else {
      setLectureData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsUploading(true);

    const payload = new FormData();
    if (lectureData.videoUrl) {
      payload.append("videoUrl", lectureData.videoUrl);
    }
    payload.append("title", lectureData.title);
    payload.append("duration", lectureData.duration);

    try {
      await axiosInstance.post(`upload-lecture/${courseId}`, payload, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });
      getLectures(courseId);
      setLectureData({ title: "", duration: "", videoUrl: null });
      setVideoPreview(null);
      onClose();
    } catch (error) {
      const message = error?.response?.data?.message || "Upload failed.";
      setErrorMessage(message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const isFormValid =
    lectureData.title.trim() !== "" &&
    lectureData.duration.trim() !== "" &&
    lectureData.videoUrl !== null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg
          max-h-[80vh] flex flex-col"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
          Add New Lecture
        </h2>

        {errorMessage && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {errorMessage}
          </div>
        )}

        {isUploading && (
          <div className="w-full mb-4">
            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden shadow-md">
              <div
                className="bg-purple-600 h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="text-sm text-center text-gray-600 mt-1">
              Uploading: {uploadProgress}%
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 overflow-y-auto max-h-[60vh] pr-2"
          id="upload-lecture-form"
        >
          <fieldset disabled={isUploading} className="space-y-6 flex-grow">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                Title
              </label>
              <input
                onChange={handleOnChange}
                value={lectureData.title}
                name="title"
                type="text"
                placeholder="Enter lecture title"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                Duration
              </label>
              <input
                onChange={handleOnChange}
                value={lectureData.duration}
                name="duration"
                type="text"
                placeholder="e.g., 10:45"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                Video File
              </label>
              <input
                onChange={handleOnChange}
                name="videoUrl"
                type="file"
                accept="video/*"
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                  file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                required
              />
            </div>

            {videoPreview && (
              <div className="mt-4 rounded-lg border border-gray-300 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
                <video
                  controls
                  ref={videoRef}
                  src={videoPreview}
                  className="w-full max-h-60 rounded-md object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setVideoPreview(null);
                    setLectureData((prev) => ({ ...prev, videoUrl: null }));
                    if (videoRef.current) {
                      videoRef.current.pause();
                      videoRef.current.src = "";
                    }
                  }}
                  className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition"
                >
                  Remove Video
                </button>
              </div>
            )}
          </fieldset>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-300 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !isFormValid}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadLecture;
