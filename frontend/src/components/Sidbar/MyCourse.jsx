import React from 'react';

const MyCourses = () => {
  const courses = [
    {
      id: 1,
      title: 'Web Development June Batch 2024',
      image: '/course-image.jpg', // Update with correct path or URL
      completed: 0,
      total: 10,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white px-6 py-10">
      {/* Active Courses Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Active Courses ({courses.length})
      </h2>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => {
          const percentage = Math.round((course.completed / course.total) * 100);
          return (
            <div
              key={course.id}
              className="bg-purple-50 p-4 rounded-lg shadow-md transition hover:shadow-lg"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
              <div className="mt-3">
                <div className="h-2 w-full bg-purple-200 rounded-full">
                  <div
                    className="h-2 bg-purple-600 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-sm text-right mt-1 font-semibold text-purple-600">
                  {percentage}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;
