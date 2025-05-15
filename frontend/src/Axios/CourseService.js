import axiosInstance from "./AxiosInstance";

const createCourse = (data) => {
  return axiosInstance.post("create-course", data);
};

const courseService = {
  createCourse,
};

export default courseService;
