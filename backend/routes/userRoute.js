import { Router } from "express";
import {
  registerUser,
  loginUser,
  loginWithEnrollmentOrStudentID,
  logout,
  getProfile,
  contactUs,
  forgotPassword,
  resetPassword,
  UpdateProfile,
} from "../controller/userController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import {
  addLectureProgress,
  createUserCourse,
  deleteLecture,
  deleteUserCourse,
  getAllCourse,
  getCourseLectures,
  getMyCourse,
  getProgress,
  getSingleCourse,
  searchCourse,
  updateCourse,
  updateLecture,
  uploadLecture,
} from "../controller/courseConroller.js";
import { upload } from "../utils/cloudinary.js";
import {
  getAllStudents,
  getCourseRevenue,
  getCourseRevenueWithBuyers,
  getMonthlyStudentSignups,
  getRevenueStats,
  totalEnrollStudent,
} from "../controller/AdminController.js";
import videoUpload from "../middleware/multer.js";
import {
  createQuiz,
  examsubmission,
  getCourseQuiz,
} from "../controller/examController.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/student-login").post(loginWithEnrollmentOrStudentID);
router.route("/logout").post(logout);
// Is Authenticated
router.route("/profile").get(isAuthenticated, getProfile);
router
  .route("/update-profile")
  .put(isAuthenticated, upload.single("avatar"), UpdateProfile);
router.route("/my-course").get(isAuthenticated, getMyCourse);
router
  .route("/create-course")
  .post(isAuthenticated, isAdmin, upload.single("imageUrl"), createUserCourse);
router
  .route("/update-course/:courseId")
  .put(isAuthenticated, isAdmin, upload.single("imageUrl"), updateCourse);
router.route("/delete-course/:id").delete(isAuthenticated, deleteUserCourse);
router.route("/get-all-course").get(isAuthenticated, getAllCourse);
router.route("/courses/revenue").get(isAuthenticated, getRevenueStats);
router
  .route("/courses/revenue/users")
  .get(isAuthenticated, getCourseRevenueWithBuyers);
router.route("/revenue-by-course").get(isAuthenticated, getCourseRevenue);
router.route("/all-students").get(isAuthenticated, isAdmin, getAllStudents);
router
  .route("/getMonthlyStudentSignups")
  .get(isAuthenticated, isAdmin, getMonthlyStudentSignups);

router
  .route("/enroll-student")
  .get(isAuthenticated, isAdmin, totalEnrollStudent);

router.route("/course").get(isAuthenticated, getSingleCourse);
router.route("/courses").get(searchCourse);
router.route("/add-course-progress").post(isAuthenticated, addLectureProgress);
router
  .route("/upload-lecture/:courseId")
  .post(isAuthenticated, videoUpload.single("videoUrl"), uploadLecture);
router
  .route("/update-lecture")
  .put(isAuthenticated, videoUpload.single("videoUrl"), updateLecture);
router.route("/:courseId").get(isAuthenticated, getProgress);
router.route("/lectures/:cousreId").get(isAuthenticated, getCourseLectures);
router.route("/create-course-quiz/quizzes").post(isAuthenticated, createQuiz);
router.route("/quizzes/:quizId/submit").post(isAuthenticated, examsubmission);
router.route("/course/quiz").get(isAuthenticated, getCourseQuiz);

router
  .route("/delete-lecture/:courseId")
  .delete(isAuthenticated, deleteLecture);
router.route("/send-mail").post(contactUs);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

export default router;
