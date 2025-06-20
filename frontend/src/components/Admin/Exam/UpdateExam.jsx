import React, { useState, useEffect } from "react";
import useCourseQuiz from "@/hooks/useCourseQuiz";
import axiosInstance from "@/Axios/AxiosInstance";
import ConfirmModal from "../ManageCourse/ConfirmModal";

const UpdateExam = ({ courseId: selectedCourseId }) => {
  const { quiz, questions: initialQuestions, loading: loadingQuiz, error } = useCourseQuiz(selectedCourseId);

  const [questions, setQuestions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [savingQuestionIds, setSavingQuestionIds] = useState([]);
  const [quizDeleted, setQuizDeleted] = useState(false);
  const [quizData, setQuizData] = useState({
    title: "",
    questions: []
  });

  useEffect(() => {
    if (quiz) {
      setQuizData({
        title: quiz?.title || ""
      })
    }
  }, [quiz])




  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    message: "",
    onConfirm: null
  });

  useEffect(() => {
    setQuestions(initialQuestions ? JSON.parse(JSON.stringify(initialQuestions)) : []);
  }, [initialQuestions]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  const updateQuestionText = (index, text) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = text;
    setQuestions(newQuestions);
  };

  const updateOptionText = (qIndex, oIndex, text) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = text;
    setQuestions(newQuestions);
  };

  const updateCorrectAnswer = (qIndex, answer) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = answer;
    setQuestions(newQuestions);
  };

  const updateSingleQuestion = async (question) => {
    if (!quiz?._id) {
      alert("Quiz ID not found.");
      return;
    }

    try {
      setSavingQuestionIds((ids) => [...ids, question._id]);
      await axiosInstance.put(`quizzes/${quiz._id}/questions/${question._id}`, question);
      alert("Question updated successfully.");
    } catch (error) {
      console.error("Failed to update question:", error);
      alert("Failed to update question. Please try again.");
    } finally {
      setSavingQuestionIds((ids) => ids.filter((id) => id !== question._id));
    }
  };

  const deleteSingleQuestion = async (questionId) => {
    if (!quiz?._id) return false;

    try {
      await axiosInstance.delete(`quizzes/${quiz._id}/questions/${questionId}`);
      return true;
    } catch (error) {
      console.error("Failed to delete question:", error);
      alert("Failed to delete question. Please try again.");
      return false;
    }
  };

  const deleteQuestion = (index) => {
    setConfirmModal({
      isOpen: true,
      message: "Are you sure you want to delete this question?",
      onConfirm: async () => {
        const questionToDelete = questions[index];

        if (questionToDelete?._id) {
          setSaving(true);
          const success = await deleteSingleQuestion(questionToDelete._id);
          setSaving(false);
          if (!success) return;
        }

        setQuestions((prev) => {
          const newQuestions = [...prev];
          newQuestions.splice(index, 1);
          return newQuestions;
        });

        setConfirmModal({ ...confirmModal, isOpen: false });
      },
    });
  };

  const finalQuizData = {
    ...quizData,
    questions: questions,
  };

  const saveQuiz = async () => {
    for (const q of questions) {
      if (!q.questionText.trim()) {
        alert("Question text cannot be empty.");
        return;
      }
      if (!q.options.every((opt) => opt.trim())) {
        alert("All options must be filled.");
        return;
      }
      if (!q.correctAnswer.trim()) {
        alert("Please select the correct answer.");
        return;
      }
    }

    try {
      if (!quiz?._id) {
        alert("Quiz ID not found.");
        return;
      }

      setSaving(true);
      const response = await axiosInstance.put(`save-all-quiz/${quiz?._id}`, finalQuizData);
      const updatedQuiz = response?.data;
      setQuizData({ title: updatedQuiz.title || "" });
      setQuestions(updatedQuiz.questions || []);
      alert("Quiz updated successfully!");
    } catch (error) {
      console.error("Failed to update quiz:", error);
      alert("Failed to update quiz. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const deleteEntireQuiz = () => {
    setConfirmModal({
      isOpen: true,
      message: "Are you sure you want to delete the entire quiz? This action cannot be undone.",
      onConfirm: async () => {
        if (!quiz?._id) return;

        try {
          setSaving(true);
          await axiosInstance.put(`delete-all-quiz/${quiz._id}`);
          alert("Quiz deleted successfully!");
          setQuizDeleted(true);
        } catch (error) {
          console.error("Failed to delete quiz:", error);
          alert("Failed to delete quiz. Please try again.");
        } finally {
          setSaving(false);
          setConfirmModal({ ...confirmModal, isOpen: false });
        }
      }
    });
  };

  if (loadingQuiz) return <p>Loading quiz...</p>;
  if (error) return <p className="text-red-600">Failed to load quiz.</p>;
  if (quizDeleted) return <p>The quiz has been deleted.</p>;
  if (!quiz) return <p>No quiz found for this course.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Update Exam: <span className="text-indigo-600">{quiz.title || "Untitled Quiz"}</span>
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quiz Title
        </label>
        <input
          type="text"
          placeholder="Enter quiz title"
          className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={quizData.title}
          onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
        />
      </div>

      {questions.map((q, qIndex) => {
        const isSaving = savingQuestionIds.includes(q._id);
        return (
          <div key={qIndex} className="mb-8 bg-white border border-gray-200 rounded-lg shadow-sm p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Question {qIndex + 1}
              </h3>
              <button
                onClick={() => deleteQuestion(qIndex)}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
                disabled={saving || isSaving}
              >
                Delete
              </button>
            </div>

            <input
              type="text"
              value={q.questionText}
              onChange={(e) => updateQuestionText(qIndex, e.target.value)}
              placeholder="Enter question text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={saving || isSaving}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`correctAnswer-${qIndex}`}
                    checked={q.correctAnswer === option}
                    onChange={() => updateCorrectAnswer(qIndex, option)}
                    className="form-radio text-indigo-600"
                    disabled={saving || isSaving}
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOptionText(qIndex, oIndex, e.target.value)}
                    placeholder={`Option ${oIndex + 1}`}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={saving || isSaving}
                  />
                </div>
              ))}
            </div>

            {q._id && (
              <button
                onClick={() => updateSingleQuestion(q)}
                disabled={saving || isSaving}
                className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Question"}
              </button>
            )}
          </div>
        );
      })}

      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={addQuestion}
          className="px-5 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
          disabled={saving}
        >
          + Add Question
        </button>

        <button
          onClick={saveQuiz}
          className="px-6 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save All Changes"}
        </button>

        <button
          onClick={deleteEntireQuiz}
          className="px-6 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition disabled:opacity-50"
          disabled={saving}
        >
          {saving ? "Deleting..." : "Delete Entire Quiz"}
        </button>
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        message={confirmModal.message}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
      />
    </div>
  );

};

export default UpdateExam;
