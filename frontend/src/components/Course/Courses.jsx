import React, { useEffect, useState } from 'react';
import BuyCourseModal from '../BuyCourse';
import { useUserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const Courses = () => {
  const { courses, getCourses, userData, fetchProfile } = useUserContext()
  const [selectedCourse, setSelectedCourse] = useState(null)

  useEffect(() => {
    fetchProfile()
    getCourses();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📚 Available Courses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course, index) => (
            <div
              key={index}
              onClick={() => setSelectedCourse(course)}
              className="cursor-pointer bg-white rounded-xl shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{course?.title}</h2>
              <p className="text-gray-600 mb-2">Price: ₹{course?.price}</p>
              <p className="text-blue-600 font-semibold">
                {userData?.purchasedCourses?.includes(course?._id) ? "Already Purchased" : "Buy"}
              </p>

              <Link to={`${course?._id}`}>View Course</Link>
            </div>
          ))}
        </div>
      </div>

      {selectedCourse && (
        <BuyCourseModal
          course={selectedCourse}
          userId={userData?._id}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default Courses;
