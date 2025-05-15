import React, { useState } from "react";

const Exam = () => {
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "Which language is used for web development?",
      options: ["Java", "C++", "JavaScript", "Python"],
      correctAnswer: "JavaScript",
    },
    {
      id: 3,
      question: "What is 5 + 3?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "8",
    },
    {
      id: 4,
      question: "Which one is a JavaScript framework?",
      options: ["Laravel", "Django", "React", "Spring"],
      correctAnswer: "React",
    },
    {
      id: 5,
      question: "CSS stands for?",
      options: [
        "Cascading Style Script",
        "Cascading Style Sheets",
        "Coding Style System",
        "Creative Style Sheet",
      ],
      correctAnswer: "Cascading Style Sheets",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setShowResults(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();

  return (
    <div className="w-full h-screen flex flex-col">
      <div className=" text-center flex justify-between mb-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">📚 Exam</h2>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all"
        >
          Submit Exam
        </button>
      </div>

      {showResults ? (
        <div className="bg-white p-6 rounded-xl shadow-md text-center mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Results</h3>
          <p className="text-xl text-purple-600">
            ✅ You scored {score} out of {questions.length}
          </p>
          <p className="text-gray-600 mt-2">
            {score === questions.length
              ? "Perfect! 🎉"
              : score >= 3
                ? "Good job, keep learning!"
                : "You can do better next time 💪"}
          </p>
          <button
            onClick={handleRetake}
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Retake Exam
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-y-auto flex-1 pr-2 mb-4">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white p-4 mb-4 rounded-lg shadow"
              >
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {question.question}
                </p>
                {question.options.map((option, index) => (
                  <label key={index} className="block mt-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleAnswerChange(question.id, option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
          </div>


        </>
      )}
    </div>
  );
};

export default Exam;
