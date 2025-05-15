import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search for courses..."
          className="w-full border rounded p-2"
        />
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border shadow-md mt-1 rounded z-10">
          {suggestions.map((course) => (
            <li
              key={course._id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
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
