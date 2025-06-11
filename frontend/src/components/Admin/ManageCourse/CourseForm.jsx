import React from "react";

const CourseForm = ({ formData, onChange, onSubmit }) => {
  const fields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Image URL", name: "imageUrl", type: "text" },
    { label: "Price (₹)", name: "price", type: "number" },
    { label: "Tags (comma separated)", name: "courseTag", type: "text" },
    { label: "Instructor", name: "instructor", type: "text" },
    { label: "Language", name: "language", type: "text" },
    { label: "Topics (comma separated)", name: "topics", type: "text" },
    { label: "Overview (comma separated)", name: "overview", type: "text" },
  ];

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow space-y-6"
    >
      {fields.map(({ label, name, type }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {label}
          </label>
          {type === "textarea" ? (
            <textarea
              name={name}
              value={formData[name]}
              onChange={onChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
          )}
        </div>
      ))}

      <div className="text-center">
        <button
          type="submit"
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          Update Course
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
