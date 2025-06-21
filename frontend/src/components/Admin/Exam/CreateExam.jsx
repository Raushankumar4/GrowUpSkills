import { useEffect, useState } from "react";
import axiosInstance from "@/Axios/AxiosInstance";
import { useUserContext } from "@/context/UserContext";
import UpdateExam from "./UpdateExam";
import CustomLoader from "@/components/Loading/CustomLoader";
import { showErrorToast, showSuccessToast } from "@/utils/ToastSimple";

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

  const [current, setCurrent] = useState("Create-exam");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const { courses, getCourses, isLoading, hideLoading, showLoading } =
    useUserContext();

  useEffect(() => {
    getCourses();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalQuizData = {
      ...quizData,
      questions: questionsData,
      courseId: selectedCourseId,
    };

    try {
      showLoading();
      await axiosInstance.post("create-course-quiz/quizzes", finalQuizData);
      setQuizData({ title: "", questions: [] });
      setQuestionsData([
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ]);
      showSuccessToast("Quiz created successfully!");
      setSelectedCourseId("");
    } catch (error) {
      showErrorToast("Error creating quiz. Please try again.");
      console.error("Error creating quiz:", error);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Quiz Management</h2>

      {/* Course Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Course
        </label>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a course
          </option>
          {courses?.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* View toggle buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setCurrent("Create-exam")}
          className={`px-4 py-2 rounded-md font-medium ${
            current === "Create-exam"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Create Exam
        </button>
        <button
          onClick={() => setCurrent("Manage-Exam")}
          className={`px-4 py-2 rounded-md font-medium ${
            current === "Manage-Exam"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Manage Exam
        </button>
      </div>

      {selectedCourseId ? (
        current === "Create-exam" ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quiz Title
              </label>
              <input
                type="text"
                value={quizData.title}
                onChange={(e) =>
                  setQuizData({ ...quizData, title: e.target.value })
                }
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
                  <h3 className="text-lg font-semibold text-gray-700">
                    Question #{index + 1}
                  </h3>
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

            {/* Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={handleAddField}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow hover:bg-blue-700 transition"
              >
                ➕ Add Question
              </button>

              {isLoading ? (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md shadow hover:bg-green-700 transition"
                  disabled
                >
                  <CustomLoader text="Creating Exam.." />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md shadow hover:bg-green-700 transition"
                >
                  Create Exam
                </button>
              )}
            </div>
          </form>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Manage Exams for selected course
            </h3>
            <UpdateExam courseId={selectedCourseId} />
          </div>
        )
      ) : (
        <p className="text-center text-gray-500">
          Please select a course to proceed.
        </p>
      )}
    </div>
  );
}
