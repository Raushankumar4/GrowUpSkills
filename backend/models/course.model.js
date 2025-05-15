import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    imagePublicId: String,
    category: { type: String },
    lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
    topics: [String],
    language: String,
    courseLevel: String,
    courseTag: [String],
    category: String,
    instructor: String,
    overview: [String],

    modules: [
      {
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
