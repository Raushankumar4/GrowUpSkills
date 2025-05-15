import axiosInstance from "@/Axios/AxiosInstance";
import { useUserContext } from "@/context/UserContext";
import { useCallback } from "react";

export const useDeleteCourse = () => {
  const { getCourses } = useUserContext();

  const deleteCourse = useCallback(
    async (courseId) => {
      try {
        const { data } = await axiosInstance.delete(
          `delete-course/${courseId}`
        );
        await getCourses();
        console.log(data);
      } catch (error) {
        console.error("Failed to delete course:", error);
      }
    },
    [getCourses]
  );

  return deleteCourse;
};
