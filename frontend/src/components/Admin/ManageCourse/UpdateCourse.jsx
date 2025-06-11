import React, { useState } from "react";
import TabNavigation from "./TabNavigation";
import CourseForm from "./CourseForm";
import AddLecture from "./AddLecture";



const UpdateCourse = () => {
  const [formData, setFormData] = useState({
    title: "React Masterclass",
    description: "Learn React from scratch with hands-on projects.",
    imageUrl: "https://via.placeholder.com/300",
    price: "999",
    courseTag: "React,JavaScript,Frontend",
    instructor: "John Doe",
    language: "English",
    topics: "JSX,Hooks,State Management,Routing",
    overview: "React basics,Hooks,Building real-world apps",
  });

  const [activeTab, setActiveTab] = useState("update-course");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Course:", formData);
    alert("Course updated (dummy)");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 dark:text-white text-center">
        Update Course
      </h2>
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === "update-course" && (
        <CourseForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
      {activeTab === "add-lectures" && <AddLecture />}
    </div>
  );
};

export default UpdateCourse;
