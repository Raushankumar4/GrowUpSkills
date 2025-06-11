import React, { useState } from "react";

const AddLecture = () => {
  const [lectureData, setLectureData] = useState({
    title: "",
    duration: "",
    videoFile: null,
  });

  const [videoPreview, setVideoPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false); // toggle state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setLectureData((prev) => ({
        ...prev,
        videoFile: file,
      }));
      const fileURL = URL.createObjectURL(file);
      setVideoPreview(fileURL);
      setShowPreview(true); // auto show after selecting
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lecture Data:", lectureData);
    alert("Lecture added (dummy)");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow text-gray-800 dark:text-white space-y-6">
      <h3 className="text-2xl font-bold mb-4">Add New Lecture</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Lecture Title</label>
          <input
            type="text"
            name="title"
            value={lectureData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Introduction to React"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Video File</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Duration (in minutes)</label>
          <input
            type="number"
            name="duration"
            value={lectureData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="30"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded"
          >
            Add Lecture
          </button>
        </div>
      </form>

      {videoPreview && (
        <div className="mt-6">
          <button
            onClick={() => setShowPreview((prev) => !prev)}
            className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {showPreview ? "Hide Video" : "Show Video"}
          </button>

          {showPreview && (
            <video
              controls
              src={videoPreview}
              className="w-full rounded"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
    </div>
  );
};

export default AddLecture;
