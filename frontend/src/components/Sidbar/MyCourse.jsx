import React, { useState } from 'react';
import { useUserContext } from '../../context/UserContext';

const MyCourses = () => {
  const { myCourse: courses, courseProgress } = useUserContext();
  const [filter, setFilter] = useState('active'); 

  const filteredCourses = courses?.filter(() => {
    const percentage = courseProgress?.percentage || 0;
    return filter === 'active' ? percentage < 100 : percentage === 100;
  });

  return (
    <div className="w-full min-h-screen bg-white px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {filter === 'active' ? 'Active Courses' : 'Completed Courses'} ({filteredCourses?.length || 0})
        </h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-purple-300 text-purple-700 font-medium px-3 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="active">Active Courses</option>
          <option value="completed">Completed Courses</option>
        </select>
      </div>

      {(!filteredCourses || filteredCourses.length === 0) ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          No {filter === 'active' ? 'active' : 'completed'} courses found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const percentage = courseProgress?.percentage || 0;

            return (
              <div
                key={course?._id}
                className="bg-purple-50 p-4 rounded-lg shadow-md transition hover:shadow-lg"
              >
                <img
                  src={course.image || ""}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">
                Web Development June Batch 2024 {course.title || "Untitled Course"}
                </h3>

                <div className="mt-3">
                  <div className="h-2 w-full bg-purple-200 rounded-full">
                    <div
                      className="h-2 bg-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-sm text-right mt-1 font-semibold text-purple-600">
                    {percentage === 100 ? "Completed 100%" : `${percentage} %`}
                  </div>

      
                  
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
