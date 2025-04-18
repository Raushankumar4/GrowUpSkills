import { createBrowserRouter } from "react-router-dom";
import Profile from "../components/User/Profile";
import Login from "../components/Auth/Login";
import Courses from "../components/Course/Courses";
import GetSingleCourse from "../components/Course/GetSingleCourse";
import App from "../App";
import PurchaseSuccess from "../components/Course/PurchaseSuccess";
import { Razorpay } from "../razorpay/razorpay";
import PaymentSuccess from "../razorpay/PaymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <h1 className="w-screen flex justify-center items-center h-screen text-center font-bold text-4xl ">
        Page Not Found 404!
      </h1>
    ),
    children: [
      { path: "profile", element: <Profile /> },
      { path: "courses/:courseId", element: <GetSingleCourse /> },
      { path: "purchase-success", element: <PurchaseSuccess /> },
      { path: "razorpay", element: <Razorpay /> },
    ],
  },
  { path: "courses", element: <Courses /> },
  { path: "login", element: <Login /> },
  { path: "paymentSuccess", element: <PaymentSuccess /> }
]);
