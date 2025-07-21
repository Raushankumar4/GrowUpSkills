import axiosInstance from "@/Axios/AxiosInstance";
import getCookie from "@/hooks/getCookie";
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const token = getCookie("token");

  useEffect(() => {
    if (!token) return;
    const fetchPurchases = async () => {
      try {
        const { data } = await axiosInstance.get("purchase");
        setPurchases(data?.payments || []);
      } catch (error) {
        console.error("Failed to fetch purchases:", error);
      }
    };
    fetchPurchases();
  }, [token]);

  const statusIcon = {
    success: <FaCheckCircle className="text-green-500 mr-1.5" />,
    pending: <FaClock className="text-yellow-500 mr-1.5" />,
    failed: <FaTimesCircle className="text-red-500 mr-1.5" />,
  };

  const statusColor = {
    success: "text-green-600",
    pending: "text-yellow-600",
    failed: "text-red-600",
  };

  if (!purchases || purchases.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
        <img
          src="/assets/empty-purchase.svg"
          alt="No purchases"
          className="w-48 h-48 mb-6"
        />
        <p className="text-gray-600 text-lg">
          You haven’t purchased any course yet.
        </p>
        <a
          href="/courses"
          className="mt-4 px-5 py-2 text-white bg-sky-500 hover:bg-sky-600 rounded-lg font-medium transition"
        >
          Explore Courses
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-sky-600">
        My Purchases
      </h2>

      <div className="grid gap-6">
        {purchases.map((purchase) => {
          const course = purchase.course;
          const title =
            course?.title || purchase.courseTitleSnapshot || "Untitled Course";
          const category = course?.category || "N/A";
          const language = course?.language || "N/A";
          const level = course?.courseLevel || "N/A";
          const amount = purchase.amount;
          const status = purchase.status;
          const purchaseDate = new Date(
            purchase.purchaseConfirmedAt
          ).toLocaleString();
          const thumbnail = course?.imageUrl || "/default-thumbnail.jpg";

          return (
            <div
              key={purchase._id}
              className={`border-t-4 ${
                status === "success"
                  ? "border-green-500"
                  : status === "pending"
                  ? "border-yellow-500"
                  : "border-red-500"
              } bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden`}
            >
              <div className="grid md:grid-cols-4 gap-6 p-6">
                {/* Thumbnail */}
                <div className="md:col-span-1">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-36 object-cover rounded-md"
                  />
                </div>

                {/* Course Info */}
                <div className="md:col-span-3 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full">
                      Category: {category}
                    </span>
                    <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full">
                      Language: {language}
                    </span>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      Level: {level}
                    </span>
                  </div>

                  {/* Status & Amount */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2">
                    <div className="text-sky-600 font-bold text-lg">
                      ₹{amount}
                    </div>
                    <div
                      className={`flex items-center mt-2 sm:mt-0 font-medium text-sm ${statusColor[status]}`}
                    >
                      {statusIcon[status]}{" "}
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </div>
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-500">
                    Purchased on {purchaseDate}
                  </p>

                  {/* Razorpay IDs */}
                  <div className="text-xs text-gray-400 bg-sky-50 rounded-md p-3 border border-sky-100">
                    <p>
                      <strong>Payment ID:</strong>{" "}
                      {purchase.razorpay_payment_id}
                    </p>
                    <p>
                      <strong>Signature:</strong> {purchase.razorpay_signature}
                    </p>
                  </div>

                  {/* View Course */}
                  {course?._id && (
                    <div className="pt-3">
                      <Link
                        to={`/course-details/${course._id}`}
                        className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-md transition"
                      >
                        <FaEye /> View Course
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPurchases;
