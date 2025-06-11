import axiosInstance from '@/Axios/AxiosInstance';
import getCookie from '@/hooks/getCookie';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaClock, FaTimesCircle, FaEye } from 'react-icons/fa';

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

  if (!purchases || purchases.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-lg text-gray-500">No purchases found.</p>
      </div>
    );
  }

  const statusIcon = {
    success: <FaCheckCircle className="text-green-500 mr-1" />,
    pending: <FaClock className="text-yellow-500 mr-1" />,
    failed: <FaTimesCircle className="text-red-500 mr-1" />,
  };

  const statusColor = {
    success: 'text-green-600',
    pending: 'text-yellow-600',
    failed: 'text-red-600',
  };

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Purchase History</h2>

      <div className="space-y-8">
        {purchases.map((purchase) => {
          const course = purchase.course;
          const title = course?.title || purchase.courseTitleSnapshot || 'Untitled Course';
          const category = course?.category || 'N/A';
          const language = course?.language || 'N/A';
          const level = course?.courseLevel || 'N/A';
          const amount = purchase.amount;
          const status = purchase.status;
          const purchaseDate = new Date(purchase.purchaseConfirmedAt).toLocaleString();

          return (
            <div
              key={purchase._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>

              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Language:</strong> {language}</p>
                <p><strong>Level:</strong> {level}</p>
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className="text-blue-600 font-semibold text-lg">
                  ${amount}
                </div>
                <div className={`flex items-center font-medium text-sm ${statusColor[status]}`}>
                  {statusIcon[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-2">Purchased on {purchaseDate}</p>

              <div className="text-xs text-gray-400 border-t pt-3">
                <p>Razorpay Payment ID: {purchase.razorpay_payment_id}</p>
                <p>Razorpay Signature: {purchase.razorpay_signature}</p>
              </div>

              {/* View Course Button */}
              {course?._id && (
                <div className="pt-4">
                  <a
                    href={`/courses/${course._id}`}
                    className="inline-flex items-center bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                  >
                    <FaEye className="mr-2" />
                    View Course
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPurchases;
