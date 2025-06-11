import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrashAlt, FaEllipsisV } from "react-icons/fa";
import { useUserContext } from "@/context/UserContext";
import { useDeleteCourse } from "@/hooks/useDeleteCourse";
import { useHandleDeleteWithUndo } from "@/hooks/useHandleDeleteWithUndo";

const ManageCourses = () => {
  const [search, setSearch] = useState("");
  const { courses: allCourses, getCourses } = useUserContext();
  const deleteCourse = useDeleteCourse();
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null); // For dropdown menu

  const {
    items: courses,
    setItems: setCourses,
    handleDelete,
    handleUndo,
    showUndo,
  } = useHandleDeleteWithUndo({ deleteFn: deleteCourse });

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    setCourses(allCourses || []);
  }, [allCourses]);

  const filteredCourses = courses?.filter((course) =>
    course.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleMenuToggle = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen p-6">
      <header className="sticky top-0 z-10 p-4 mb-6 flex justify-between items-center bg-white">
        <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm max-w-sm w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {/* Undo toast */}
      {showUndo && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-700 p-4 rounded-md shadow-lg w-64 flex items-center justify-between z-20">
          <span>Course deleted.</span>
          <button onClick={handleUndo} className="text-blue-800 font-bold">
            Undo
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto mt-8">
        {courses?.length === 0 ? (
          <div className="text-gray-500 text-center">Loading courses...</div>
        ) : filteredCourses?.length === 0 ? (
          <div className="text-gray-500 text-center">No courses found.</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:table w-full overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-md text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Instructor</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course._id} className="border-t border-gray-200">
                      <td className="px-4 py-3">
                        <img
                          src={course.image || "/placeholder.png"}
                          alt={course.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">{course.title}</td>
                      <td className="px-4 py-3">${course.price || "0.00"}</td>
                      <td className="px-4 py-3">{course.instructor}</td>
                      <td className="px-4 py-3 relative">
                        <button
                          onClick={() => handleMenuToggle(course._id)}
                          className="text-gray-700 hover:text-black"
                        >
                          <FaEllipsisV />
                        </button>

                        {openMenuId === course._id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md z-20">
                            <Link
                              to={`/dashboard/manage-courses/courses/${course._id}`}
                              className="block px-4 py-2 hover:bg-gray-100 text-sm"
                            >
                              <FaEye className="inline mr-2" /> View
                            </Link>
                            <button
                              onClick={() => navigate(`update/${course._id}`)}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                            >
                              <FaEdit className="inline mr-2" /> Edit
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
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                            >
                              <FaTrashAlt className="inline mr-2" /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden space-y-6 mt-8">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
                >
                  <img
                    src={course.image || "/placeholder.png"}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {course.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-sm text-gray-700 font-semibold mb-4">
                    ${course.price || "0.00"}
                  </p>
                  <div className="flex justify-between text-sm">
                    <Link
                      to={`/dashboard/manage-courses/courses/${course._id}`}
                      className="text-gray-700 hover:text-black font-medium flex items-center"
                    >
                      <FaEye className="mr-1" /> View
                    </Link>
                    <button
                      onClick={() => navigate(`update/${course._id}`)}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Deleting this course will remove all associated data. Continue?"
                          )
                        ) {
                          handleDelete(course);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 font-medium flex items-center"
                    >
                      <FaTrashAlt className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ManageCourses;
