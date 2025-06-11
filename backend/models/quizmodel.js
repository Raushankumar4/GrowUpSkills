import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const QuizSchema = new Schema(
  {
    title: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", QuizSchema);
