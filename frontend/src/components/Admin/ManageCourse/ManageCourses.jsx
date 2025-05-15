import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useUserContext } from "@/context/UserContext";
import { useDeleteCourse } from "@/hooks/useDeleteCourse";
import { useHandleDeleteWithUndo } from "@/hooks/useHandleDeleteWithUndo";

const ManageCourses = () => {
  const [search, setSearch] = useState("");
  const { courses: allCourses, getCourses } = useUserContext();
  const deleteCourse = useDeleteCourse();

  const {
    items: courses,
    setItems: setCourses,
    handleDelete,
    handleUndo,
    showUndo
  } = useHandleDeleteWithUndo({ deleteFn: deleteCourse });

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    setCourses(allCourses || []);
  }, [allCourses]);

  const handleEdit = (id) => {
    console.log(`Edit course with id: ${id}`);
  };

  const filteredCourses = courses?.filter((course) =>
    course.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6">
      <header className="sticky top-0 z-10 p-4 mb-6 flex justify-between items-center bg-white">
        <h1 className="text-2xl font-bold text-gray-800 hidden md:block">Courses</h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm max-w-sm w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {/* Undo message */}
      {showUndo && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-700 p-4 rounded-md shadow-lg w-64 flex items-center justify-between z-20">
          <span>Course deleted.</span>
          <button onClick={handleUndo} className="text-blue-800 font-bold">
            Undo
          </button>
        </div>
      )}

      <main className="max-w-6xl mx-auto mt-16">
        {courses?.length === 0 ? (
          <div className="text-gray-500 text-center">Loading courses...</div>
        ) : filteredCourses?.length === 0 ? (
          <div className="text-gray-500 text-center">No courses found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course?._id}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition duration-200"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                <p className="text-xs text-gray-500 mb-4">Instructor: {course.instructor}</p>
                <div className="flex gap-4 text-sm">
                  <Link
                    to={`/dashboard/manage-courses/courses/${course._id}`}
                    className="text-gray-700 hover:text-black font-medium flex items-center"
                  >
                    <FaEye className="mr-2" /> View
                  </Link>
                  <button
                    onClick={() => handleEdit(course._id)}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          "Warning: Deleting this course will remove all associated lectures and users who purchased it. This action can be undone. Do you wish to proceed?"
                        )
                      ) {
                        handleDelete(course);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 font-medium flex items-center"
                  >
                    <FaTrashAlt className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageCourses;
