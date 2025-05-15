import CourseTable from "@/components/Admin/ManageCourse/CourseTable";
import CourseView from "@/components/Admin/ManageCourse/CourseView";
import ManageCourses from "@/components/Admin/ManageCourse/ManageCourses";
import UserManagement from "@/components/Admin/ManageCourse/UserManagment";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import OAuthSuccess from "@/components/Auth/OAuthSuccess";
import ResetPassword from "@/components/Auth/ResetPassword";
import ErrorBoundary from "@/components/Error/ErrorBoundary";
import RouterError from "@/components/Error/RouterError";
import Loading from "@/components/Loading/Loading";
import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("../App"));
const Profile = lazy(() => import("../components/User/Profile"));
const PurchaseSuccess = lazy(() => import("../components/Course/PurchaseSuccess"));
const AdminDashboard = lazy(() => import("../components/Admin/AdminDashboard"));
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
      { path: "/profile", element: <Profile /> },
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


  // Admin
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminDashboard />
      </Suspense>
    ),
    children: [
      { path: "create-course", element: <CreateCourse /> },
      { path: "manage-courses", element: <ManageCourses /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "manage-courses/courses/:courseId", element: <CourseView /> }

    ],
  },
]);

