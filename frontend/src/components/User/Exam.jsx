import React, { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import useCourseQuiz from "@/hooks/useCourseQuiz";
import axiosInstance from "@/Axios/AxiosInstance";
import QuizAnswersDetails from "../Admin/Exam/QuizAnswersDetails";

const Exam = () => {
  const { myCourse, getMyCourses, userData } = useUserContext();

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

 
  const { quiz, questions, loading: loadingQuiz, error } = useCourseQuiz(selectedCourseId);

  React.useEffect(() => {
    getMyCourses();
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
      questionId,
      selectedAnswer,
    }));

    try {
      setLoadingSubmit(true);
      const { data } = await axiosInstance.post(
        `/quizzes/${quiz._id}/submit`,
        { answers: formattedAnswers, userId: userData?._id }
      );
      setResult(data);
      setShowResults(true);
    } catch (error) {
      console.error("Failed to submit exam:", error);
      alert("Failed to submit exam. Please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setResult(null);
    setShowResults(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">📚 Exam</h2>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Course</option>
          {myCourse?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {loadingQuiz && <p>Loading quiz...</p>}
      {error && <p className="text-red-600">Failed to load quiz.</p>}

      {!selectedCourseId && <p>Please select a course to start the quiz.</p>}

      {questions.length > 0 && !showResults && (
        <>
          {questions.map((q) => (
            <div key={q._id} className="mb-6 p-4 border rounded shadow-sm">
              <p className="font-semibold mb-2">{q.questionText}</p>
              <div>
                {[...new Set(q.options)].map((option, index) => (
                  <label key={`${q._id}-${index}`} className="mr-6 inline-flex items-center">
                    <input
                      type="radio"
                      name={`question-${q._id}`}
                      value={option}
                      checked={answers[q._id] === option}
                      onChange={() => handleAnswerChange(q._id, option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={loadingSubmit}
            className="self-start px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loadingSubmit ? "Submitting..." : "Submit Exam"}
          </button>
        </>
      )}

      {showResults && result && (
        <div className="bg-white p-6 rounded-xl shadow-md text-center mt-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Results</h3>
          <p className="text-xl text-purple-600">
            ✅ You scored {result.score} out of {result.total}
          </p>
          <p className="text-gray-600 mt-2">
            {result.score === result.total
              ? "Perfect! 🎉"
              : result.score >= 3
                ? "Good job, keep learning!"
                : "You can do better next time 💪"}
          </p>

          <button
            onClick={handleRetake}
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Retake Exam
          </button>

          <QuizAnswersDetails quizId={quiz._id} userId={userData?._id} />
        </div>
      )}

      {!questions.length && selectedCourseId && !showResults && (
        <p>No quizzes found for this course.</p>
      )}
    </div>
  );
};

export default Exam;
