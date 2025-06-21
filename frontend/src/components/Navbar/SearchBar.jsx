import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import axiosInstance from "@/Axios/AxiosInstance";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const fetchSuggestions = debounce(async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axiosInstance.get(`courses?search=${query}`);
      setSuggestions(res.data);
    } catch (err) {
      console.error("Error fetching suggestions", err);
    }
  }, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchSuggestions(value);
  };

  const handleSelectSuggestion = (title) => {
    navigate(`/courses/search?q=${encodeURIComponent(title)}`);
    setSearch("");
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/courses/search?q=${encodeURIComponent(search)}`);
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search courses, internships..."
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full bg-zinc-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm transition"
        />
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg mt-1 rounded-xl z-50 overflow-hidden">
          {suggestions.map((course) => (
            <li
              key={course._id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer text-sm text-gray-800 dark:text-gray-100 transition"
              onClick={() => handleSelectSuggestion(course.title)}
            >
              {course.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
