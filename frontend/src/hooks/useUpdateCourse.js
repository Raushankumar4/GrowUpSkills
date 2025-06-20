import axiosInstance from "@/Axios/AxiosInstance";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useRef, useState } from "react";

export const useUpdateCourse = (courseId) => {
  const { getSingleCourse, course } = useUserContext();

  const [formData, setFormData] = useState({
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
  const [inputValues, setInputValues] = useState({
    addTopics: "",
    addCourseTag: "",
    addOverview: "",
  });

  const inputRef = useRef(null);

  useEffect(() => {
    getSingleCourse(courseId);
  }, [courseId]);

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        description: course.description || "",
        imageUrl: course.imageUrl || null,
        price: course.price || "",
        language: course.language || "",
        courseLevel: course.courseLevel || "",
        courseTag: course.courseTag || [],
        category: course.category || "",
        instructor: course.instructor || "",
        overview: course.overview || [],
        topics: course.topics || [],
      });

      if (course.imageUrl && typeof course.imageUrl === "string") {
        setImagePreview(course.imageUrl);
      }
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageUrl") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, imageUrl: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    } else if (name in inputValues) {
      setInputValues((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = () => {
    if (inputRef.current) {
      inputRef.current.value = null;
    }
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, imageUrl: null }));
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const addToArrayField = (field, value) => {
    const trimmed = value.trim();
    if (trimmed && !formData[field].includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], trimmed],
      }));
    }
    setInputValues((prev) => ({ ...prev, [`add${capitalize(field)}`]: "" }));
  };

  const removeFromArrayField = (field, item) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((i) => i !== item),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = new FormData();

      updatedData.append("title", formData.title);
      updatedData.append("description", formData.description);
      updatedData.append("price", formData.price);
      updatedData.append("language", formData.language);
      updatedData.append("courseLevel", formData.courseLevel);
      updatedData.append("category", formData.category);
      updatedData.append("instructor", formData.instructor);
      updatedData.append("courseTag", formData.courseTag);
      updatedData.append("overview", formData.overview);
      updatedData.append("topics", formData.topics);

      if (formData.imageUrl) {
        updatedData.append("imageUrl", formData.imageUrl);
      }

      const { data } = await axiosInstance.put(
        `update-course/${courseId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      getSingleCourse(courseId);
      console.log(data);
      alert("Course updated successfully!");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course.");
    }
  };

  return {
    formData,
    inputValues,
    handleChange,
    handleSubmit,
    imagePreview,
    inputRef,
    handleRemoveImage,
    addToArrayField,
    removeFromArrayField,
  };
};
