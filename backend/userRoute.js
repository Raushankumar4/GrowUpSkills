import { Router } from "express";
import {
  registerUser,
  loginUser,
  loginWithEnrollmentOrStudentID,
  logout,
  getProfile,
} from "./userController.js";
import { isAuthenticated } from "./auth.js";
import {
  addLectureProgress,
  createUserCourse,
  getAllCourse,
  getCourseLectures,
  getMyCourse,
  getProgress,
  getSingleCourse,
  searchCourse,
  uploadLecture,
} from "./courseConroller.js";
import upload from "./middleware/multer.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/student-login").post(loginWithEnrollmentOrStudentID);
router.route("/logout").post(logout);
// Is Authenticated
router.route("/profile").get(isAuthenticated, getProfile);
router.route("/my-course").get(isAuthenticated, getMyCourse);
router.route("/create-course").post(isAuthenticated, createUserCourse);
router.route("/get-all-course").get(isAuthenticated, getAllCourse);
router.route("/course").get(isAuthenticated, getSingleCourse);
router.route("/courses").get(isAuthenticated, searchCourse);
router
  .route("/upload-lecture/:courseId")
  .post(isAuthenticated, upload.single("videoUrl"), uploadLecture);
router.route("/:courseId").get(isAuthenticated, getProgress);
router.route("/add-course-progress").post(isAuthenticated, addLectureProgress);
router.route("/lectures/:cousreId").get(isAuthenticated, getCourseLectures);


export default router;
