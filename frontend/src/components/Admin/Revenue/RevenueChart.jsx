import { useEffect, useState } from "react";
import {
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import axiosInstance from "../../../Axios/AxiosInstance";

const RevenueChart = () => {
  const [data, setData] = useState({
    weeklyRevenue: [],
    monthlyRevenue: [],
    yearlyRevenue: [],
  });

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await axiosInstance.get("courses/revenue");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenue();
  }, []);

  const formatData = (arr, type) =>
    arr.map(item => ({
      name:
        type === "week"
          ? `W${item._id.week}/${item._id.year}`
          : type === "month"
            ? `${item._id.month}/${item._id.year}`
            : `${item._id.year}`,
      revenue: item.totalRevenue,
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {/* Weekly Revenue - Line Chart */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold text-center mb-2">📈 Weekly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatData(data.weeklyRevenue, "week")}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Revenue - Area Chart */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold text-center mb-2">📊 Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={formatData(data.monthlyRevenue, "month")}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Yearly Revenue - Bar Chart */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold text-center mb-2">📅 Yearly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formatData(data.yearlyRevenue, "year")}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
