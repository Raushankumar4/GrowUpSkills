import React from "react";
import MonthlyEnrollmentsChartByCourse from "../Charts/MonthlyEnrollmentsChart";
import MonthlySignupsChart from "../Charts/MonthlySignupsChart";
import Revenue from "./Revenue";

const Analytics = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>

      {/* Monthly Signups */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Signups</h2>
        <MonthlySignupsChart />
      </div>

      {/* Monthly Enrollments by Course */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Enrollments by Course</h2>
        <MonthlyEnrollmentsChartByCourse />
      </div>

      {/* Revenue Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Revenue Overview</h2>
        <Revenue />
      </div>
    </div>
  );
};

export default Analytics;
