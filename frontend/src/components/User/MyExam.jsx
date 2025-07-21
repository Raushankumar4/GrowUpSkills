import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

const MyExam = () => {
  const { myCourse, getMyCourses } = useUserContext();
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getMyCourses();
  }, []);

  const handleStartExam = () => {
    if (!selectedCourseId) {
      alert("Please select an exam to attempt.");
      return;
    }
    navigate(`/exam?courseId=${selectedCourseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-sky-600 text-center mb-4">
          🎯 My Exams
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Select a course below to begin your exam. Good luck!
        </p>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="courseSelect"
              className="block text-gray-700 font-medium text-lg mb-2"
            >
              Select a Course
            </label>
            <select
              id="courseSelect"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm text-gray-700 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
            >
              <option value="">-- Choose your enrolled course --</option>
              {myCourse?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button
              onClick={handleStartExam}
              className="w-full py-3 bg-sky-600 text-white rounded-xl text-lg font-semibold hover:bg-sky-700 transition-all shadow-md hover:shadow-lg"
            >
              🚀 Attempt Exam Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyExam;
