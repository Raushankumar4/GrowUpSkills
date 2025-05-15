import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";

// Sample placeholder image
const placeholderImage = "https://via.placeholder.com/80";

const courses = [
  {
    title: "Transform Your UX/UI Skills and Portfolio",
    level: "All Level",
    rating: 5.0,
    enroll: 342,
    revenue: 5698,
    date: "28 Oct, 2024",
    image: placeholderImage,
  },
  {
    title: "Learn The Human Computer Interaction",
    level: "Beginner",
    rating: 5.0,
    enroll: 321,
    revenue: 5439,
    date: "27 Oct, 2024",
    image: placeholderImage,
  },
  {
    title: "Learn The Human-Centered Design",
    level: "Intermediate",
    rating: 5.0,
    enroll: 298,
    revenue: 4640,
    date: "18 Sep, 2024",
    image: placeholderImage,
  },
  {
    title: "Design Systems Bootcamp",
    level: "Expert",
    rating: 4.5,
    enroll: 287,
    revenue: 4322,
    date: "16 Sep, 2024",
    image: placeholderImage,
  },
  {
    title: "Articulating Design Bootcamp",
    level: "All Level",
    rating: 4.5,
    enroll: 276,
    revenue: 3898,
    date: "28 Aug, 2024",
    image: placeholderImage,
  },
  {
    title: "UX/UI Design Bootcamp",
    level: "Beginner",
    rating: 4.0,
    enroll: 257,
    revenue: 3897,
    date: "16 Aug, 2024",
    image: placeholderImage,
  },
  {
    title: "Visual Design Bootcamp",
    level: "Intermediate",
    rating: 4.0,
    enroll: 233,
    revenue: 2789,
    date: "25 Aug, 2024",
    image: placeholderImage,
  },
  {
    title: "Storytelling Bootcamp",
    level: "Expert",
    rating: 3.5,
    enroll: 221,
    revenue: 2765,
    date: "20 Jul, 2024",
    image: placeholderImage,
  },
  {
    title: "Practical UX Case Study",
    level: "All Level",
    rating: 3.5,
    enroll: 200,
    revenue: 2320,
    date: "13 Jul, 2024",
    image: placeholderImage,
  },
];

export default function CourseTable() {
  const [openAction, setOpenAction] = useState(null);

  const toggleActions = (index) => {
    setOpenAction(openAction === index ? null : index);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Courses</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow border">
        <table className="w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Course</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Enrolled</th>
              <th className="p-4">Revenue</th>
              <th className="p-4">Created</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                {/* Course Info with Image */}
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{course.title}</div>
                      <div className="text-xs text-gray-500">Level: {course.level}</div>
                    </div>
                  </div>
                </td>

                {/* Rating */}
                <td className="p-4 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  {course.rating}
                </td>

                {/* Enrollment */}
                <td className="p-4">{course.enroll}</td>

                {/* Revenue */}
                <td className="p-4">${course.revenue.toFixed(2)}</td>

                {/* Created Date */}
                <td className="p-4">{course.date}</td>

                {/* Actions */}
                <td className="p-4 relative">
                  <Button size="sm" variant="outline" onClick={() => toggleActions(index)}>
                    <MoreVertical className="w-4 h-4" />
                  </Button>

                  {openAction === index && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-20">
                      <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </button>
                      <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100">
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
