import axiosInstance from "@/Axios/AxiosInstance";
import { useState } from "react";

export default function CreateExam() {
  const [quizData, setQuizData] = useState({
    title: "",
    questions: [],
  });

  const [questionsData, setQuestionsData] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  const handleAddField = () => {
    setQuestionsData([
      ...questionsData,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const handleRemoveField = (index) => {
    const updated = [...questionsData];
    updated.splice(index, 1);
    setQuestionsData(updated);
  };

  const handleOnChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...questionsData];
    updated[index][name] = value;
    setQuestionsData(updated);
  };

  const handleOptionChange = (qIndex, optIndex, e) => {
    const updated = [...questionsData];
    updated[qIndex].options[optIndex] = e.target.value;
    setQuestionsData(updated);
  };

  const courseId = "68218530218e3c985cc7ad5f"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setQuizData((prev) => ({
      ...prev,
      questions: questionsData,
    }));


    try {
      const { data } = await axiosInstance.post("create-course-quiz/quizzes", {
        ...quizData, questions: questionsData, courseId
      })
      console.log(data);
    } catch (error) {
      console.log(error)
    }

    console.log("Quiz data:", {
      ...quizData,
      questions: questionsData,
    });


  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Quiz</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
          <input
            type="text"
            value={quizData.title}
            onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter quiz title"
          />
        </div>

        {questionsData.map((question, index) => (
          <div
            key={index}
            className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Question #{index + 1}</h3>
              {questionsData.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  ✖ Remove
                </button>
              )}
            </div>

            <input
              type="text"
              name="questionText"
              placeholder="Enter question..."
              value={question.questionText}
              onChange={(e) => handleOnChange(index, e)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              {question.options.map((opt, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(index, optIndex, e)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <input
              type="text"
              name="correctAnswer"
              placeholder="Correct Answer (must match one of the options)"
              value={question.correctAnswer}
              onChange={(e) => handleOnChange(index, e)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        ))}

        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={handleAddField}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow hover:bg-blue-700 transition"
          >
            ➕ Add Question
          </button>

          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-md shadow hover:bg-green-700 transition"
          >
            ✅ Submit Quiz
          </button>
        </div>
      </form>
    </div>

  );
}
