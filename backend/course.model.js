import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    category: { type: String },
    instructor: { type: Schema.Types.ObjectId, ref: "User" },
    studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
    modules: [
      {
        title: String,
        content: String,
        videos: [String],
        quizzes: [
          {
            title: String,
            questions: [
              {
                questionText: String,
                options: [String],
                correctAnswer: String,
              },
            ],
          },
        ],
      },
    ],

    duration: { type: String },
    price: { type: Number, default: 0 },
    ratings: [
      {
        studentId: { type: Schema.Types.ObjectId, ref: "User" },
        rating: Number,
      },
    ],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
