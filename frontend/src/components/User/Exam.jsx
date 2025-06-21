import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import useCourseQuiz from "@/hooks/useCourseQuiz";
import axiosInstance from "@/Axios/AxiosInstance";
import QuizAnswersDetails from "../Admin/Exam/QuizAnswersDetails";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Confetti from "react-confetti";
import Swal from "sweetalert2";

const COLORS = ["#0088FE", "#FF8042", "#00C49F"];

const Exam = () => {
  const navigate = useNavigate();
  const { myCourse, getMyCourses, userData } = useUserContext();
  const [params] = useSearchParams();
  const defaultCourseId = params.get("courseId") || "";
  const [selectedCourseId, setSelectedCourseId] = useState(defaultCourseId);
  const [answers, setAnswers] = useState({});
  const [reviewMarked, setReviewMarked] = useState([]);
  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [timer, setTimer] = useState(600);
  const [timerActive, setTimerActive] = useState(false);
  const [cheatCount, setCheatCount] = useState(0);

  const { quiz, questions } = useCourseQuiz(selectedCourseId);

  useEffect(() => {
    getMyCourses();
    if (defaultCourseId) {
      setTimerActive(true);
      setTimer(600);
      requestFullscreen();
    }

    const blockPopState = (e) => {
      e.preventDefault();
      navigate(0);
    };
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", blockPopState);
    return () => window.removeEventListener("popstate", blockPopState);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        setCheatCount((c) => c + 1);
        alert("Tab switching is not allowed!");
      }
    };
    const blockAction = (e) => {
      e.preventDefault();
      setCheatCount((c) => c + 1);
      alert("Copy/paste/right-click not allowed!");
    };
    const blockScreenshot = (e) => {
      if (e.key === "PrintScreen") {
        setCheatCount((c) => c + 1);
        alert("Screenshot is not allowed!");
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("contextmenu", blockAction);
    document.addEventListener("copy", blockAction);
    document.addEventListener("paste", blockAction);
    window.addEventListener("keydown", blockScreenshot);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("contextmenu", blockAction);
      document.removeEventListener("copy", blockAction);
      document.removeEventListener("paste", blockAction);
      window.removeEventListener("keydown", blockScreenshot);
    };
  }, []);

  useEffect(() => {
    if (timerActive && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0 && !showResults) handleSubmit();
  }, [timer, timerActive]);

  const requestFullscreen = () => {
    const docElm = document.documentElement;
    if (docElm.requestFullscreen) docElm.requestFullscreen();
    else if (docElm.mozRequestFullScreen) docElm.mozRequestFullScreen();
    else if (docElm.webkitRequestFullscreen) docElm.webkitRequestFullscreen();
    else if (docElm.msRequestFullscreen) docElm.msRequestFullscreen();
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  };

  const handleGoBack = () => {
    exitFullscreen();
    window.history.pushState(null, null, "/");
    navigate("/", { replace: true });
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    const updatedAnswers = { ...answers, [questionId]: selectedOption };
    setAnswers(updatedAnswers);
    localStorage.setItem("skillhub-answers", JSON.stringify(updatedAnswers));
  };

  const handleReviewMark = (questionId) => {
    setReviewMarked((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSubmit = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure you want to submit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit!",
    });
    if (!confirm.isConfirmed) return;

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, selectedAnswer]) => ({ questionId, selectedAnswer })
    );

    try {
      setLoadingSubmit(true);
      const { data } = await axiosInstance.post(`/quizzes/${quiz._id}/submit`, {
        answers: formattedAnswers,
        userId: userData?._id,
      });
      setResult(data);
      setShowResults(true);
      setTimerActive(false);
      localStorage.removeItem("skillhub-answers");
    } catch (err) {
      alert("Failed to submit. Try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  const dataChart = [
    { name: "Correct", value: result?.score || 0 },
    { name: "Incorrect", value: result ? result.total - result.score : 0 },
    {
      name: "Unattempted",
      value: questions.length - Object.keys(answers).length,
    },
  ];

  return (
    <div className="relative">
      {/* Watermark */}
      {!showResults && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10 flex justify-center items-center">
          <p className="text-6xl font-bold text-black select-none transform rotate-45">
            SkillHub Exam
          </p>
        </div>
      )}

      <div className="relative z-10 min-h-screen py-10 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-sky-700">
              📚 SkillHub Exam
            </h2>
            <button
              onClick={handleGoBack}
              className="text-sm text-sky-600 underline hover:text-sky-800"
            >
              ← Exit Exam
            </button>
          </div>

          {timerActive && (
            <div className="text-right text-lg text-rose-600 mb-2">
              Time Left: {formatTime(timer)}
            </div>
          )}
          <div className="text-right text-sm italic text-red-500 mb-4">
            ⚠️ Cheating detection active. Attempts: {cheatCount}
          </div>

          {questions.length > 0 && !showResults && (
            <div className="flex gap-6">
              <div className="w-3/4">
                {questions.map((q, idx) => (
                  <div
                    key={q._id}
                    className="mb-6 bg-white p-5 rounded-xl shadow-md border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">
                        Q{idx + 1}: {q.questionText}
                      </p>
                      <button
                        onClick={() => handleReviewMark(q._id)}
                        className="text-xs text-blue-500 underline"
                      >
                        {reviewMarked.includes(q._id)
                          ? "Unmark Review"
                          : "Mark for Review"}
                      </button>
                    </div>
                    {q.options.map((opt, i) => (
                      <label key={i} className="block py-1">
                        <input
                          type="radio"
                          name={`question-${q._id}`}
                          checked={answers[q._id] === opt}
                          onChange={() => handleAnswerChange(q._id, opt)}
                          className="mr-2"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ))}
                <button
                  onClick={handleSubmit}
                  className="mt-6 bg-sky-700 text-white px-8 py-3 rounded-xl shadow hover:bg-sky-800 transition-all duration-200"
                >
                  🚀 Submit Exam
                </button>
              </div>
              <div className="w-1/4">
                <p className="font-semibold mb-2">🧭 Navigation</p>
                <div className="grid grid-cols-4 gap-2">
                  {questions.map((q, idx) => (
                    <button
                      key={q._id}
                      className={`p-2 text-xs border rounded font-semibold transition-all duration-200 ease-in-out ${
                        answers[q._id]
                          ? "bg-green-100 text-green-800 border-green-400"
                          : reviewMarked.includes(q._id)
                          ? "bg-yellow-100 text-yellow-800 border-yellow-400"
                          : "bg-gray-50 text-gray-600 border-gray-300"
                      } hover:scale-105`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-sm">
                  Answered: {Object.keys(answers).length}/{questions.length}
                </p>
              </div>
            </div>
          )}

          {showResults && result && (
            <div className="bg-white mt-10 p-8 rounded-xl shadow-lg text-center border border-gray-200">
              <h3 className="text-2xl font-bold mb-2">🎉 Result</h3>
              <p className="text-lg text-sky-600 font-semibold">
                Score: {result.score} / {result.total}
              </p>
              <div className="mt-6 flex justify-center">
                <PieChart width={300} height={200}>
                  <Pie
                    data={dataChart}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {dataChart.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
              <p className="text-sm mt-2 text-gray-500">
                Cheating Events Detected: {cheatCount}
              </p>
              <QuizAnswersDetails quizId={quiz._id} userId={userData?._id} />
              <Confetti numberOfPieces={200} recycle={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exam;
