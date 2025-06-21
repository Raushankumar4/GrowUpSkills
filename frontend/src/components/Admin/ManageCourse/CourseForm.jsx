import CustomLoader from "@/components/Loading/CustomLoader";
import React, { useState } from "react";

const CourseForm = ({
  formData,
  handleChange,
  onSubmit,
  imagePreview,
  inputRef,
  onRemoveImage,
  inputValues,
  addToArrayField,
  removeFromArrayField,
  isLoading,
}) => {
  const stepFields = [
    [
      { label: "Title", name: "title", type: "text" },
      { label: "Description", name: "description", type: "textarea" },
      { label: "Image", name: "imageUrl", type: "file" },
    ],
    [
      { label: "Price (₹)", name: "price", type: "number" },
      { label: "Language", name: "language", type: "text" },
      { label: "Category", name: "category", type: "text" },
      { label: "Course Level", name: "courseLevel", type: "text" },
    ],
    [{ label: "Instructor", name: "instructor", type: "text" }],
    ["topics", "courseTag", "overview"],
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === stepFields.length - 1;
  const isTagStep = Array.isArray(stepFields[currentStep]);

  const renderTagSection = (field, label) => (
    <div className="space-y-2" key={field}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          name={`add${field.charAt(0).toUpperCase() + field.slice(1)}`}
          value={
            inputValues[`add${field.charAt(0).toUpperCase() + field.slice(1)}`]
          }
          onChange={handleChange}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        />
        <button
          type="button"
          onClick={() =>
            addToArrayField(
              field,
              inputValues[
                `add${field.charAt(0).toUpperCase() + field.slice(1)}`
              ]
            )
          }
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData[field].map((item, index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded flex items-center"
          >
            <span className="mr-2">{item}</span>
            <button
              type="button"
              onClick={() => removeFromArrayField(field, item)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const handleNext = () => {
    if (currentStep < stepFields.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLastStep) {
      onSubmit(e);
    } else {
      handleNext();
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow space-y-6"
    >
      {isTagStep && currentStep === 3 ? (
        <>
          {renderTagSection("topics", "Add Moule Topics")}
          {renderTagSection("courseTag", "Course Includes")}
          {renderTagSection("overview", "Add Course Overview")}
        </>
      ) : (
        stepFields[currentStep].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <input
                type={type}
                name={name}
                {...(type !== "file" ? { value: formData[name] } : {})}
                onChange={handleChange}
                accept={type === "file" ? "image/*" : undefined}
                ref={name === "imageUrl" ? inputRef : null}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              />
            )}

            {type === "file" && imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-auto rounded shadow"
                />
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="mt-2 inline-block bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
        ))
      )}

      <div className="flex justify-between pt-4">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <CustomLoader text="Saving..." />
          ) : isLastStep ? (
            "Update Course"
          ) : (
            "Next"
          )}
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
