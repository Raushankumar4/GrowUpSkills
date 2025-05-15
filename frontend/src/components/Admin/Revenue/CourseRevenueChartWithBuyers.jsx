import { useState } from "react";
import axiosInstance from "../../../Axios/AxiosInstance";
import { useEffect } from "react";

const CourseRevenueChartWithBuyers = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [data, setData] = useState([])


  const getrevenue = async () => {
    const res = await axiosInstance("courses/revenue/users")
    setData(res?.data?.revenueByCourse)
    console.log(res?.data?.revenueByCourse);

  }
  useEffect(() => {
    getrevenue()
  }, [])

  const toggleBuyers = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6">Course Revenue & Buyers</h2>

      {data.map((course, index) => (
        <div
          key={course.courseId}
          className="bg-white shadow-md rounded-xl p-4 mb-4 border"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{course.title}</h3>
              <p className="text-sm text-gray-600">
                Revenue: ₹{course.totalRevenue} | Purchases:{" "}
                {course.totalPurchases}
              </p>
            </div>
            <button
              onClick={() => toggleBuyers(index)}
              className="text-blue-600 hover:underline"
            >
              {openIndex === index ? "Hide Buyers" : "Show Buyers"}
            </button>
          </div>

          {openIndex === index && (
            <div className="mt-4">
              {course.buyers.length > 0 ? (
                <ul className="list-disc pl-5 text-sm">
                  {course.buyers.map((user) => (
                    <li key={user._id}>
                      <strong>{user.username}</strong> ({user.email}) - ID:{" "}
                      {user.studentID}, Enrollment: {user.enrollement}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No buyers yet.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseRevenueChartWithBuyers;
