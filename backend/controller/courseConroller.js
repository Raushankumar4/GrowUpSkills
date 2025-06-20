import { Course } from "../models/course.model.js";
import User from "../models/user.model.js";
import { Lecture } from "../models/lecture.model.js";
import Progress from "../models/courseprogress.js";
import cloudinary from "cloudinary";
import { handleResponse } from "../utils/handleResponse.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createUserCourse = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      topics,
      language,
      courseLevel,
      courseTag,
      category,
      instructor,
      overview,
    } = req.body;

    if (
      !title ||
      !price ||
      !topics ||
      !overview ||
      !instructor ||
      !description ||
      !language ||
      !category ||
      !courseLevel ||
      !courseTag
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    let imageUrl = null;
    let imagePublicId = null;

    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    }

    const course = await Course.create({
      title,
      price,
      imageUrl,
      imagePublicId,
      topics: [topics],
      language,
      courseLevel,
      courseTag: [courseTag],
      category,
      instructor,
      description,
      overview: [overview],
    });

    return res.status(201).json({
      message: "Course created successfully.",
      course,
    });
  } catch (error) {
    console.error("Create course error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      topics,
      language,
      courseLevel,
      courseTag,
      category,
      instructor,
      overview,
    } = req.body;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    if (course.imagePublicId && req.file) {
      await cloudinary.v2.uploader.destroy(course.imagePublicId);
    }

    let imageUrl = course.imageUrl;
    let imagePublicId = course.imagePublicId;

    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        title,
        price,
        description,
        topics: [topics],
        language,
        courseLevel,
        courseTag: [courseTag],
        category,
        instructor,
        overview: [overview],
        imageUrl,
        imagePublicId,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Course updated successfully.",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Update course error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

export const deleteUserCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id).populate("lectures");
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Delete lecture video files
    if (course.lectures && course.lectures.length > 0) {
      for (const lecture of course.lectures) {
        if (lecture.videoUrl) {
          const oldVideoPath = path.join(__dirname, "..", lecture.videoUrl);
          fs.unlink(oldVideoPath, (err) => {
            if (err) {
              console.error(
                "Error deleting video:",
                lecture.videoUrl,
                err.message
              );
            } else {
              console.log("Deleted video:", lecture.videoUrl);
            }
          });
        }
        await Lecture.findByIdAndDelete(lecture._id);
      }
    }

    // Remove this course from all users' purchasedCourses
    await User.updateMany(
      { purchasedCourses: id },
      {
        $pull: {
          purchasedCourses: id,
          lectures: { $in: course.lectures.map((lec) => lec._id) },
        },
      }
    );

    // Delete course image from Cloudinary if present
    if (course.imagePublicId) {
      await cloudinary.v2.uploader.destroy(course.imagePublicId);
    }

    // Delete course
    await Course.findByIdAndDelete(id);

    res.status(200).json({
      message: "Course, lectures, and related data deleted successfully.",
    });
  } catch (error) {
    console.error("Deletion failed:", error);
    res.status(500).json({ error: "Server error during deletion" });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const course = await Course.find().sort({ createdAt: -1 });
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

    res.status(200).json({
      message: "Lecture uploaded successfully",
      lecture,
    });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { title, duration } = req.body;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      throw new Error("Lecture Required!");
    }

    if (lecture.videoUrl) {
      const oldVideoPath = path.join(__dirname, "..", lecture.videoUrl);
      fs.unlink(oldVideoPath, (err) => {
        if (err) {
          console.error("Error deleting old video:", err);
        } else {
          console.log("Old video deleted:", lecture.videoUrl);
        }
      });
    }

    const videoUrl = `/uploads/${req.file.filename}`;
    console.log(videoUrl);

    const updatedLecture = await Lecture.findByIdAndUpdate(
      lectureId,
      {
        title,
        duration,
        videoUrl,
      },
      { new: true }
    );

    return handleResponse(res, 200, "Lecture Updated!", updatedLecture);
  } catch (error) {
    console.log(error);
    return handleResponse(res, 500, `Internal Server Error: ${error.message}`);
  }
};

export const deleteLecture = async (req, res) => {
  try {
    const { lectureId, lectureOrder } = req.query;
    const { courseId } = req.params;

    if (!lectureId || !lectureOrder || !courseId) {
      return res.status(400).json({
        message:
          "Missing required parameters (lectureId, lectureOrder, courseId)",
      });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "No Lecture Found!" });
    }
    if (lecture.videoUrl) {
      const oldVideoPath = path.join(__dirname, "..", lecture.videoUrl);
      fs.unlink(oldVideoPath, (err) => {
        if (err) {
          console.error("Error deleting old video:", err);
        } else {
          console.log("Old video deleted:", lecture.videoUrl);
        }
      });
    }

    const course = await Course.findByIdAndUpdate(courseId, {
      $pull: { lectures: lecture._id },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not Found!" });
    }

    await Progress.findOneAndUpdate(
      { courseId, userId: req.user },
      { $pull: { completedLectures: lectureOrder } }
    );

    await Lecture.deleteOne({ _id: lectureId });

    res.status(200).json({
      message: "Lecture and progress updated successfully!",
    });
  } catch (error) {
    console.error("Error deleting lecture:", error);
    res.status(500).json({
      message: "An error occurred while deleting the lecture.",
      error: error.message,
    });
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
