import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PurchaseSuccess = () => {
  const location = useLocation();
  const { course } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-300 flex flex-col justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Purchase Successful!</h1>
        <p className="text-lg text-gray-700 mb-6">
          You now own <strong>{course?.title}</strong>.
        </p>

        <a
          href={course?.downloadLink}
          download
          className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition mb-4"
        >
          ⬇️ Download Course
        </a>

        <div className="mt-4">
          <Link
            to="/courses"
            className="text-blue-600 hover:underline"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
