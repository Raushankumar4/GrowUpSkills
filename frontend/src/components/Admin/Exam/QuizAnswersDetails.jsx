import React, { useState } from "react";
import axiosInstance from "@/Axios/AxiosInstance";

const QuizAnswersDetails = ({ quizId, userId }) => {
  const [answersDetails, setAnswersDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnswersDetails = async () => {
    if (!quizId || !userId) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.get(`/quizzes/${quizId}/answers`, {
        params: { userId },
      });
      setAnswersDetails(data?.answers);
    } catch (err) {
      setError("Failed to load answers details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <button
        onClick={fetchAnswersDetails}
        className="px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-sky-600 hover:to-indigo-700 transition duration-300"
      >
        📖 Show My Quiz Answers
      </button>

      {loading && (
        <p className="mt-4 text-gray-500 animate-pulse">
          Fetching your answers...
        </p>
      )}

      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}

      {!loading && !error && answersDetails.length > 0 && (
        <div className="mt-6 space-y-6">
          {answersDetails?.map((ans, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <p className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                Q{index + 1}: {ans.questionText}
              </p>
              <div className="text-sm">
                <p>
                  Your Answer:
                  <span
                    className={`ml-2 font-semibold px-2 py-1 rounded-md inline-block ${
                      ans.userAnswer === ans.correctAnswer
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {ans.userAnswer || "No answer"}
                  </span>
                </p>
                {ans.userAnswer !== ans.correctAnswer && (
                  <p className="mt-1">
                    Correct Answer:
                    <span className="ml-2 font-semibold text-green-600">
                      {ans.correctAnswer}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizAnswersDetails;
