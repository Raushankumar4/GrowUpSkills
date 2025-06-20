import axiosInstance from "@/Axios/AxiosInstance";
import { useUserContext } from "@/context/UserContext";
import { showErrorToast, showSuccessToast } from "@/utils/ToastSimple";
import { useCallback } from "react";

export const useDeleteLecture = (courseId) => {
  const { getLectures } = useUserContext();

  const deleteLecture = useCallback(
    async (lectureId, lectureOrder) => {
      try {
        const { data } = await axiosInstance.delete(
          `delete-lecture/${courseId}?lectureId=${lectureId}&lectureOrder=${lectureOrder}`
        );
        showSuccessToast(data?.message || "Lecture Deleted Successfully !");
        await getLectures(courseId);
      } catch (error) {
        showErrorToast(error.response.data?.message || "Something went wrong!");
        console.error("Failed to delete lecture:", error);
      }
    },
    [courseId, getLectures]
  );

  return deleteLecture;
};
