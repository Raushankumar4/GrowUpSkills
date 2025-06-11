import { Course } from "../models/course.model.js";
import { QuizAttempt } from "../models/quizattemptmodel.js";
import { Quiz } from "../models/quizmodel.js";

export const createQuiz = async (req, res) => {
  const { title, questions, courseId } = req.body;

  if (!title || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: "Invalid quiz data" });
  }

  try {
    const newQuiz = await Quiz.create({
      title,
      course: courseId,
      questions,
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: { quizzes: newQuiz._id },
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: "Failed to create quiz", error });
  }
};

export const examsubmission = async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    const answerLog = [];

    quiz.questions.forEach((q) => {
      const userAnswer = answers.find(
        (a) => String(a.questionId) === String(q._id)
      );
      const isCorrect = userAnswer?.selectedAnswer === q.correctAnswer;
      if (isCorrect) score++;

      answerLog.push({
        questionId: q._id,
        selectedAnswer: userAnswer?.selectedAnswer || null,
        isCorrect,
      });
    });

    const attempt = await QuizAttempt.create({
      quiz: quizId,
      user: req.user,
      score,
      total: quiz.questions.length,
      answers: answerLog,
      attempt,
    });

    res.status(200).json({
      message: "Quiz submitted",
      score,
      total: quiz.questions.length,
      correctAnswers: answerLog.filter((a) => a.isCorrect).length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error submitting quiz", error });
  }
};

export const getCourseQuiz = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseQuiz = await Course.findById(courseId).populate("quizzes");

    if (!courseQuiz) {
      throw new Error("No Quiz Found");
    }
    return res.status(200).json({ message: "Quiz", courseQuiz });
  } catch (error) {
    res.status(500).json({ message: "Failed to get course quiz !" });
  }
};
