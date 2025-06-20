import axiosInstance from "@/Axios/AxiosInstance";
import { useState, useEffect } from "react";

export default function useCourseQuiz(courseId) {
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) {
      setQuiz(null);
      setQuestions([]);
      return;
    }

    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axiosInstance.get(`course/quiz/${courseId}`);

        const courseQuiz = data.courseQuiz;

        if (courseQuiz?.quizzes?.length > 0) {
          const quizData = courseQuiz.quizzes[0];
          setQuiz(quizData);
          setQuestions(quizData.questions);
        } else {
          setQuiz(null);
          setQuestions([]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [courseId]);

  return { quiz, questions, loading, error };
}
