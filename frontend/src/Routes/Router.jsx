
import ManageCourses from "@/components/Admin/ManageCourse/ManageCourses";
import UserManagement from "@/components/Admin/ManageCourse/UserManagment";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import OAuthSuccess from "@/components/Auth/OAuthSuccess";
import ResetPassword from "@/components/Auth/ResetPassword";
import ErrorBoundary from "@/components/Error/ErrorBoundary";
import RouterError from "@/components/Error/RouterError";
import Loading from "@/components/Loading/Loading";
import Announcement from "@/components/Sidbar/Announcement";
import MyCourses from "@/components/Sidbar/MyCourse";
import Calendar from "@/components/User/Calendar";
import Exam from "@/components/User/Exam";
import MyCertificates from "@/components/User/MyCertificates";
import MyPurchases from "@/components/User/MyPurchases";
import StudentSettings from "@/components/User/StudentSettings";
import UpdateProfile from "@/components/User/UpdateProfile";
import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import UpdateCourse from "@/components/Admin/ManageCourse/UpdateCourse";
import Layout from "@/components/Layout/Layout";
import CreateExam from "@/components/Admin/Exam/CreateExam";
import VerifyOtp from "@/components/Auth/VerifyOtp";
import PaymentHistory from "@/components/Payment/PaymentHistory";
import Revenue from "@/components/Admin/Revenue/Revenue";
import Analytics from "@/components/Admin/Revenue/Analytics";

const App = lazy(() => import("../App"));
const PurchaseSuccess = lazy(() => import("../components/Course/PurchaseSuccess"));
const PaymentSuccess = lazy(() => import("../razorpay/PaymentSuccess"));
const SearchCourse = lazy(() => import("../components/Course/SearchCourse"));
const CreateCourse = lazy(() => import("@/components/Admin/CreateCoures/CreateCourse"));
const CourseDetails = lazy(() => import("@/components/Course/CourseDetails"));
const CourseCard = lazy(() => import("@/razorpay/CourseCard"));
const AuthForm = lazy(() => import("@/components/Auth/AuthForm"));
const StudyCourse = lazy(() => import("@/components/Course/StudyCourse"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    ),
    errorElement: <RouterError />,
    children: [

      { path: "course/:courseId", element: <CourseDetails /> },
      { path: "purchase-success", element: <PurchaseSuccess /> },
      { path: "/courses/search", element: <SearchCourse /> },
      { path: "courses", element: <CourseCard /> },
      { path: "/oauth-success", element: <OAuthSuccess /> },

    ],
  },

  { path: "login", element: <AuthForm /> },
  { path: "paymentSuccess", element: <PaymentSuccess /> },
  { path: "/study/:courseId", element: <StudyCourse /> },
  { path: "forgot", element: <ForgotPassword /> },
  { path: "reset-password/:token", element: <ResetPassword /> },
  { path: "verify-otp", element: <VerifyOtp /> },



  // Admin
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      { path: "create-course", element: <CreateCourse /> },
      { path: "create-exam", element: <CreateExam /> },

      { path: "manage-courses", element: <ManageCourses /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "manage-courses/courses/:courseId", element: <CourseDetails /> },
      { path: "manage-courses/update/:id", element: <UpdateCourse /> },
      { path: "payment-history", element: <PaymentHistory /> },
      { path: "revenue", element: <Revenue /> },
      { path: "analytics", element: <Analytics /> },

      // Student Dashboard
      { path: "purchase", element: <MyPurchases /> },
      { path: "announcements", element: <Announcement /> },
      { path: "course", element: <MyCourses /> },
      { path: "profile", element: <UpdateProfile /> },
      { path: "certificates", element: <MyCertificates /> },
      { path: "exams", element: <Exam /> },
      { path: "calendar", element: <Calendar /> },
      { path: "settings", element: <StudentSettings /> },

    ],
  },
]);

