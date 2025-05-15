import React from "react";

const UpdateCourse = () => {
  return (
    <div className="max-w-6xl pt-20 mx-auto p-6 min-h-[110vh] dark:bg-gray-900">
      <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        Update Course
      </h2>

      <form>
        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-100" htmlFor="courseName">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Enter Course Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-100" htmlFor="image">
            Course Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Enter Image URL"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-100" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Enter Price"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-100" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Enter Course Description"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-100" htmlFor="createdBy">
            Instructor Name
          </label>
          <input
            type="text"
            id="createdBy"
            name="createdBy"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Enter Instructor Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-100" htmlFor="language">
            Language
          </label>
          <input
            type="text"
            id="language"
            name="language"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Enter Course Language"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-100" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Enter Tags"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-100" htmlFor="topics">
            Topics (comma separated)
          </label>
          <input
            type="text"
            id="topics"
            name="topics"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Enter Topics"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 dark:text-gray-100" htmlFor="overview">
            What You'll Learn (comma separated)
          </label>
          <input
            type="text"
            id="overview"
            name="overview"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Enter What You'll Learn"
          />
        </div>

        <button type="submit" className="bg-emerald-500 text-white font-bold py-2 px-4 rounded mt-4">
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
