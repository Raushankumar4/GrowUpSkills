import React, { useState } from "react";
import axiosInstance from "@/Axios/AxiosInstance";

const QuizAnswersDetails = ({ quizId, userId }) => {
  const [answersDetails, setAnswersDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(userId);


  const fetchAnswersDetails = async () => {
    if (!quizId || !userId) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.get(
        `/quizzes/${quizId}/answers`,
        { params: { userId } }
      );
      console.log(data);

      setAnswersDetails(data?.answers);
    } catch (err) {
      setError("Failed to load answers details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(answersDetails);


  return (
    <div>
      <button
        onClick={fetchAnswersDetails}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Show My Quiz Answers
      </button>

      {loading && <p>Loading answers...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && answersDetails.length > 0 && (
        <div className="mt-4 space-y-4">
          {answersDetails?.map((ans, index) => (
            <div
              key={index}
              className="p-4 border rounded shadow-sm"
            >
              <p className="font-semibold">Question{index + 1}: {ans.questionText}</p>
              <p>
                Your answer:
                <span
                  className={
                    ans?.userAnswer === ans.correctAnswer
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {ans.userAnswer || "No answer"}
                </span>
              </p>
              {ans.userAnswer !== ans.correctAnswer && (
                <p>
                  Correct answer: <span className="text-green-600">{ans.correctAnswer}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizAnswersDetails;
