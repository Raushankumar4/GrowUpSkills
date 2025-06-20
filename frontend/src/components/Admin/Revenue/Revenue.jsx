import React from "react";
import CourseRevenueChartWithBuyers from "./CourseRevenueChartWithBuyers";
import RevenueByCourese from "./RevenueByCourese";
import RevenueChart from "./RevenueChart";

export default function Revenue() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Revenue Dashboard</h1>


      <div className="bg-white shadow rounded-lg p-6">

        <CourseRevenueChartWithBuyers />
      </div>


      <div className="bg-white shadow rounded-lg p-6">

        <RevenueByCourese />
      </div>


      <div className="bg-white shadow rounded-lg p-6">

        <RevenueChart />
      </div>
    </div>
  );
}
