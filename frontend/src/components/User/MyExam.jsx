import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext"; // Assuming you have this

const MyExam = () => {
  const { myCourse, getMyCourses } = useUserContext();
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getMyCourses(); // Load available courses
  }, []);

  const handleStartExam = () => {
    if (!selectedCourseId) {
      alert("Please select an exam to attempt.");
      return;
    }
    navigate(`/exam?courseId=${selectedCourseId}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">My Exams</h1>
      <p className="text-center text-gray-600 mb-4">
        Here you can view and manage your exams.
      </p>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <label className="block text-gray-700 mb-2 text-lg">
          Select an Exam:
        </label>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-purple-500"
        >
          <option value="">-- Select Course --</option>
          {myCourse?.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleStartExam}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Attempt Exam
        </button>
      </div>
    </div>
  );
};

export default MyExam;
