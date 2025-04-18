import { Course } from "./course.model.js";
import User from "./user.model.js";
import Lecture from "./models/lecture.model.js";
import Progress from "./models/courseprogress.js";
import { createReadStream, statSync } from "fs";

export const createUserCourse = async (req, res) => {
  try {
    const { title, price } = req.body;
    const course = await Course.create({ title, price });
    return res.status(200).json({ message: "Your Course", course });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const course = await Course.find();
    return res.status(200).json({ message: "Your Course", course });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCourse = async (req, res) => {
  try {
    const courseId = req.query.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Your Course", course });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the course" });
  }
};

export const getMyCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user).populate("purchasedCourses");
    if (!user) {
      throw new Error("No Course Found");
    }
    return res
      .status(200)
      .json({ message: "Your Course", course: user.purchasedCourses });
  } catch (error) {
    console.log(error);
  }
};

export const searchCourse = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ message: "Keyword is required." });
    }

    const courses = await Course.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while searching for courses." });
  }
};

export const uploadLecture = async (req, res) => {
  try {
    const { title, duration } = req.body;
    const { courseId } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded." });
    }

    const videoUrl = `/uploads/${req.file.filename}`;
    const order = (await Lecture.countDocuments({ course: courseId })) + 1;

    const lecture = await Lecture.create({
      title,
      duration,
      videoUrl,
      order,
      course: courseId,
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: { lectures: lecture._id },
    });

    res.status(201).json({
      message: "Lecture uploaded successfully",
      lecture,
    });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user;

    const course = await Course.findById(courseId).populate("lectures");
    const totalLectures = course.lectures.length;

    let progress = await Progress.findOne({ userId, courseId });

    const completedLectures = progress ? progress.completedLectures : [];
    const completedCount = completedLectures.length;
    const remainingCount = totalLectures - completedCount;
    const percentage =
      totalLectures > 0 ? (completedCount / totalLectures) * 100 : 0;

    res.status(200).json({
      completedLectures,
      completedCount,
      remainingCount,
      percentage: Math.floor(percentage),
      totalLectures,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureOrder } = req.body;
    const userId = req.user;

    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      progress = new Progress({
        userId,
        courseId,
        completedLectures: [lectureOrder],
      });
    } else {
      if (!progress.completedLectures.includes(lectureOrder)) {
        progress.completedLectures.push(lectureOrder);
      }
    }

    await progress.save();

    res.status(200).json({
      message: "Lecture marked as complete.",
      completedLectures: progress.completedLectures,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseLectures = async (req, res) => {
  const { cousreId } = req.params;
  const lectures = await Course.findById(cousreId).populate("lectures");
  res.status(200).json({ lectures: lectures.lectures });
};
