import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../../Axios/AxiosInstance";

const RevenueByCourese = () => {


  const [data, setData] = useState([])


  const getrevenuebycourse = async () => {
    const res = await axiosInstance("revenue-by-course")
    setData(res?.data?.revenueByCourse)
  }

  useEffect(() => {
    getrevenuebycourse()
  }, [])


  const formatted = data.map(course => ({
    name: course.title,
    revenue: course.totalRevenue,
  }));

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-2">Revenue by Course</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueByCourese;
