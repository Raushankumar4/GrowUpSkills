import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../Axios/AxiosInstance";

export default function SearchCourse() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const res = await axiosInstance.get(`courses?search=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [query]);

  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
  };

  return (
    <div className="px-4 pt-20 py-10 sm:px-6 lg:px-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Search results for "{query}"
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-600">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col cursor-pointer"
            >
              <div
                className="h-40 bg-gray-100 rounded-t-lg flex items-center justify-center text-gray-400 text-sm"
                onClick={() => handleCourseClick(course._id)}
              >
                Course Image
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                  {course.title}
                </h2>
                <p className="text-xs text-gray-500 capitalize mb-1">
                  {course.category}
                </p>
                <p className="text-sm text-gray-600 line-clamp-3 mb-2 flex-1">
                  {course.description}
                </p>
                <div className="mt-auto">
                  <p className="text-blue-600 font-bold text-md mb-2">₹{course.price}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCourseClick(course._id)}
                      className="flex-1 bg-gray-200 text-gray-800 text-sm py-2 px-4 rounded hover:bg-gray-300 transition duration-200"
                    >
                      View Course
                    </button>
                    <button
                      onClick={() => alert(`Buying course: ${course.title}`)} 
                      className="flex-1 bg-green-600 text-white text-sm py-2 px-4 rounded hover:bg-green-700 transition duration-200"
                    >
                      Enroll Course
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
