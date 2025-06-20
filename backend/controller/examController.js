import { Course } from "../models/course.model.js";
import { QuizAttempt } from "../models/quizattemptmodel.js";
import { Quiz } from "../models/quizmodel.js";
import mongoose from "mongoose";

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
  const { answers, userId } = req.body;

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

    const userObjId = new mongoose.Types.ObjectId(userId);

    const attempt = await QuizAttempt.create({
      quiz: quizId,
      user: userObjId,
      score,
      total: quiz.questions.length,
      answers: answerLog,
    });

    res.status(200).json({
      message: "Quiz submitted",
      score,
      total: quiz.questions.length,
      correctAnswers: answerLog.filter((a) => a.isCorrect).length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting quiz", error: error.message });
  }
};

export const getCourseQuiz = async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseQuiz = await Course.findById(courseId)
      .populate("quizzes")
      .select("quizzes");

    if (!courseQuiz) {
      throw new Error("No Quiz Found");
    }
    return res.status(200).json({ message: "Quiz", courseQuiz });
  } catch (error) {
    res.status(500).json({ message: "Failed to get course quiz !" });
  }
};
export const getAnswersDetails = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { userId } = req.query;

    if (!quizId || !userId) {
      return res
        .status(400)
        .json({ message: "quizId and userId are required" });
    }

    const userObjId = new mongoose.Types.ObjectId(userId);

    // Find the user's attempt
    const attempt = await QuizAttempt.findOne({
      quiz: quizId,
      user: userObjId,
    });
    if (!attempt) {
      return res
        .status(404)
        .json({ message: "No attempt found for this quiz and user" });
    }

    // Get the quiz questions for reference
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Map questions to user's answers with correct answer
    const answersDetails = attempt.answers.map((ans) => {
      const question = quiz.questions.find(
        (q) => String(q._id) === String(ans.questionId)
      );

      return {
        questionText: question?.questionText || "Question not found",
        userAnswer: ans.selectedAnswer || null,
        correctAnswer: question?.correctAnswer || null,
      };
    });

    res.status(200).json({
      message: "User answers details",
      answers: answersDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching answers details",
      error: error.message,
    });
  }
};

export const updateQuiz = async (req, res) => {
  const { quizId } = req.params;
  const { title, questions } = req.body;

  if (!title || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: "Invalid quiz data" });
  }

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      {
        title,
        questions,
      },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: "Failed to update quiz", error });
  }
};

export const deleteQuiz = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    await Quiz.findByIdAndDelete(quizId);

    await Course.findByIdAndUpdate(quiz.course, {
      $pull: { quizzes: quizId },
    });

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete quiz", error });
  }
};

export const updateQuizQuestion = async (req, res) => {
  const { quizId, questionId } = req.params;
  const { questionText, options, correctAnswer } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const question = quiz.questions.id(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found in this quiz" });
    }

    if (questionText !== undefined) question.questionText = questionText;
    if (options !== undefined) question.options = options;
    if (correctAnswer !== undefined) question.correctAnswer = correctAnswer;

    await quiz.save();

    res.status(200).json({ message: "Question updated successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: "Failed to update question", error });
  }
};

export const deleteQuizQuestion = async (req, res) => {
  const { quizId, questionId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const questionExists = quiz.questions.some(
      (q) => q._id.toString() === questionId
    );

    if (!questionExists) {
      return res
        .status(404)
        .json({ message: "Question not found in this quiz" });
    }

    quiz.questions = quiz.questions.filter(
      (q) => q._id.toString() !== questionId
    );

    await quiz.save();

    res.status(200).json({
      message: "Question deleted successfully",
      quiz,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
