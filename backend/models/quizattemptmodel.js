import mongoose, { Schema } from "mongoose";

const QuizAttemptSchema = new Schema(
  {
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    answers: [
      {
        questionId: Schema.Types.ObjectId,
        selectedAnswer: String,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export const QuizAttempt = mongoose.model("QuizAttempt", QuizAttemptSchema);
