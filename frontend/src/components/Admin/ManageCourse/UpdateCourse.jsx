import React, { useState, useCallback } from "react";
import TabNavigation from "./TabNavigation";
import CourseForm from "./CourseForm";
import { useUpdateCourse } from "@/hooks/useUpdateCourse";
import { useParams } from "react-router-dom";
import ManageLectures from "./ManageLectures";

const UpdateCourse = () => {
  const [activeTab, setActiveTab] = useState("update-course");

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const { id } = useParams();

  const {
    formData,
    inputValues,
    handleChange,
    handleSubmit,
    imagePreview,
    inputRef,
    handleRemoveImage,
    addToArrayField,
    removeFromArrayField,
  } = useUpdateCourse(id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === "update-course" && (
        <CourseForm
          formData={formData}
          handleChange={handleChange}
          onSubmit={handleSubmit}
          imagePreview={imagePreview}
          onRemoveImage={handleRemoveImage}
          inputRef={inputRef}
          inputValues={inputValues}
          addToArrayField={addToArrayField}
          removeFromArrayField={removeFromArrayField}
        />
      )}
      {activeTab === "manage-lectures" && <ManageLectures />}
    </div>
  );
};

export default UpdateCourse;
