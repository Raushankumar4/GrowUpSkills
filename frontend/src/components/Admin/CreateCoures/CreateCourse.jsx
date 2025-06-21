import React, { useEffect, useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/utils/ToastSimple";
import courseService from "@/Axios/CourseService";
import { useUserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import UploadLecture from "../ManageCourse/UploadLecture";

const CreateCourse = () => {
  const [step, setStep] = useState(1);
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    imageUrl: null,
    price: "",
    language: "",
    courseLevel: "",
    courseTag: [],
    category: "",
    instructor: "",
    overview: [],
    topics: [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [addOveriew, setAddOveriew] = useState("");
  const [addTag, setAddTag] = useState("");
  const [addTopics, setAddTopics] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectCourseId, setSelectCourseId] = useState("");
  const [showUploader, setShowUploader] = useState(false);

  const navigate = useNavigate();
  const { getCourses, courses } = useUserContext();

  useEffect(() => {
    getCourses();
  }, []);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageUrl") {
      const file = files[0];
      setUserInput((prev) => ({ ...prev, imageUrl: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setUserInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddOveriew = () => {
    const trimmed = addOveriew.trim();
    if (trimmed && !userInput.overview.includes(trimmed)) {
      setUserInput((prev) => ({
        ...prev,
        overview: [...prev.overview, trimmed],
      }));
    }
    setAddOveriew("");
  };

  const handleAddCourseTag = () => {
    const trimmed = addTag.trim();
    if (trimmed && !userInput.courseTag.includes(trimmed)) {
      setUserInput((prev) => ({
        ...prev,
        courseTag: [...prev.courseTag, trimmed],
      }));
    }
    setAddTag("");
  };

  const handleRemoveCourseTag = (tag) => {
    setUserInput((prev) => ({
      ...prev,
      courseTag: prev.courseTag.filter((t) => t !== tag),
    }));
  };

  const handleRemoveOverview = (item) => {
    setUserInput((prev) => ({
      ...prev,
      overview: prev.overview.filter((i) => i !== item),
    }));
  };

  const removePreview = () => {
    setImagePreview(null);
    setUserInput((prev) => ({ ...prev, imageUrl: null }));
  };

  const handleAddTopics = () => {
    const trimTopics = addTopics.trim();
    if (trimTopics && !userInput.topics.includes(trimTopics)) {
      setUserInput((prev) => ({
        ...prev,
        topics: [...prev.topics, trimTopics],
      }));
    }
    setAddTopics("");
  };

  const handleRemoveTopic = (topic) => {
    setUserInput((prev) => ({
      ...prev,
      topics: prev.topics.filter((t) => t !== topic),
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", userInput.title);
    formData.append("description", userInput.description);
    formData.append("price", userInput.price);
    formData.append("language", userInput.language);
    formData.append("courseLevel", userInput.courseLevel);
    formData.append("category", userInput.category);
    formData.append("instructor", userInput.instructor);
    formData.append("topics", userInput.topics);
    formData.append("courseTag", userInput.courseTag);
    formData.append("overview", userInput.overview);
    if (userInput.imageUrl) {
      formData.append("imageUrl", userInput.imageUrl);
    }

    try {
      const response = await courseService.createCourse(formData);
      showSuccessToast(response?.data?.message);
      await getCourses();
      navigate("/courses");
    } catch (error) {
      setLoading(false);
      showErrorToast(error?.response?.data?.message || "Something went wrong!");
      console.error("Error creating course:", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (step === 4) {
      handleSubmit(e);
    } else {
      nextStep();
    }
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 bg-white max-w-screen-lg mx-auto">
      {/* Lecture Upload Section */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-2">
          Select Course to Add Lectures
        </h1>
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <select
            onChange={(e) => setSelectCourseId(e.target.value)}
            className="border p-2 rounded w-full sm:w-1/2"
          >
            <option value="">Select Course</option>
            {courses.map((course, index) => (
              <option key={index} value={course?._id}>
                {course.title}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowUploader(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Upload a New Lecture
          </button>
        </div>

        {showUploader && selectCourseId && (
          <UploadLecture
            courseId={selectCourseId}
            onClose={() => setShowUploader(false)}
          />
        )}
      </div>
      <h1 className="py-10 font-bold text-2xl ">Create Course</h1>
      {/* Stepper UI */}
      <div className="flex items-center justify-between mb-6">
        {[1, 2, 3, 4].map((s, index) => (
          <div key={s} className="flex items-center w-full">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-bold z-10 ${
                step >= s
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {s}
            </div>
            {index < 3 && (
              <div
                className={`flex-grow h-1 ${
                  step > s ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold">Step 1: Basic Info</h2>
            <input
              name="title"
              value={userInput.title}
              onChange={handleOnChange}
              placeholder="Course Title"
              className="w-full border p-2 rounded"
            />
            <input
              name="description"
              value={userInput.description}
              onChange={handleOnChange}
              placeholder="Description"
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="price"
              value={userInput.price}
              onChange={handleOnChange}
              placeholder="Price"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="instructor"
              value={userInput.instructor}
              onChange={handleOnChange}
              placeholder="Instructor Name"
              className="w-full border p-2 rounded"
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold">Step 2: Course Details</h2>
            <select
              name="language"
              onChange={handleOnChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
            <select
              name="courseLevel"
              onChange={handleOnChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select
              name="category"
              onChange={handleOnChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="AI">AI</option>
            </select>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={addTag}
                onChange={(e) => setAddTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(), handleAddCourseTag())
                }
                placeholder="Course Includes (e.g., React, Node.js)"
                className="flex-grow border p-2 rounded"
              />
              <button
                type="button"
                onClick={handleAddCourseTag}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                Course Inludes
              </button>
            </div>

            <div className="flex gap-2 flex-wrap mt-2">
              {userInput.courseTag.map((tag) => (
                <span
                  key={tag}
                  onClick={() => handleRemoveCourseTag(tag)}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200 transition"
                >
                  {tag} ✕
                </span>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-bold">Step 3: Overview & Image</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={addOveriew}
                onChange={(e) => setAddOveriew(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddOveriew())
                }
                placeholder="Add Overview Point"
                className="flex-grow border p-2 rounded"
              />
              <button
                type="button"
                onClick={handleAddOveriew}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                Add Overview
              </button>
            </div>
            <div className="flex gap-2 flex-wrap mt-2">
              {userInput.overview.map((item) => (
                <span
                  key={item}
                  onClick={() => handleRemoveOverview(item)}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200"
                >
                  {item} ✕
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <input
                type="text"
                value={addTopics}
                onChange={(e) => setAddTopics(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTopics())
                }
                placeholder="Add Module Topic"
                className="flex-grow border p-2 rounded"
              />
              <button
                type="button"
                onClick={handleAddTopics}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                Add Module Topic
              </button>
            </div>
            <div className="flex gap-2 flex-wrap mt-2">
              {userInput.topics.map((topic) => (
                <span
                  key={topic}
                  onClick={() => handleRemoveTopic(topic)}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full cursor-pointer hover:bg-green-200"
                >
                  {topic} ✕
                </span>
              ))}
            </div>

            <label className="w-full flex items-center gap-2 cursor-pointer bg-gray-100 border border-dashed border-gray-400 p-3 rounded hover:bg-gray-200 mt-4">
              <Upload className="text-blue-600 w-5 h-5" />
              <span>Upload Course Image</span>
              <input
                type="file"
                name="imageUrl"
                accept="image/*"
                onChange={handleOnChange}
                className="hidden"
              />
            </label>
            {imagePreview && (
              <div className="mt-4 relative w-fit">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-22 rounded shadow"
                />
                <button
                  type="button"
                  onClick={removePreview}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl font-bold">Step 4: Review Your Course</h2>
            <div className="space-y-2 text-sm text-gray-800">
              <p>
                <strong>Title:</strong> {userInput.title}
              </p>
              <p>
                <strong>Description:</strong> {userInput.description}
              </p>
              <p>
                <strong>Price:</strong> ${userInput.price}
              </p>
              <p>
                <strong>Language:</strong> {userInput.language}
              </p>
              <p>
                <strong>Level:</strong> {userInput.courseLevel}
              </p>
              <p>
                <strong>Category:</strong> {userInput.category}
              </p>
              <p>
                <strong>Instructor:</strong> {userInput.instructor}
              </p>
              <p>
                <strong>Tags:</strong> {userInput.courseTag.join(", ")}
              </p>
              <p>
                <strong>Overview:</strong>{" "}
                <ul className="list-disc list-inside">
                  {userInput.overview.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              </p>
              <p>
                <strong>Topics:</strong>{" "}
                <ul className="list-disc list-inside">
                  {userInput.topics.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </p>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 mt-2 rounded shadow"
                />
              )}
            </div>
          </>
        )}

        {/* Step Navigation Buttons */}
        <div className="flex justify-between flex-wrap gap-2 pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className={`px-4 py-2 text-white rounded ${
              step === 4 ? "bg-green-600" : "bg-blue-600"
            }`}
            disabled={loading}
          >
            {step === 4 ? (loading ? "Please Wait..." : "Create") : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
