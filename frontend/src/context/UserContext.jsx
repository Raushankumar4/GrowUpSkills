import { createContext, useContext, useEffect, useState, useMemo } from "react";
import axiosInstance from "../Axios/AxiosInstance";
import getCookie from "@/hooks/getCookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [myCourse, setMyCourse] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});
  const [course, setCourse] = useState({});
  const [lectures, setLectures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = getCookie("token");

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const fetchProfile = async () => {
    if (!token) return;

    try {
      showLoading();
      const { data } = await axiosInstance.get("profile");
      setUserData(data?.user || null);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    } finally {
      hideLoading();
    }
  };

  const getCourses = async () => {
    try {
      showLoading();
      const { data } = await axiosInstance.get("get-all-course");
      setCourses(data?.course || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      hideLoading();
    }
  };

  const getMyCourses = async () => {
    try {
      showLoading();
      const { data } = await axiosInstance.get("my-course");
      setMyCourse(data?.course || []);
    } catch (error) {
      console.error("Failed to fetch my courses:", error);
    } finally {
      hideLoading();
    }
  };

  const getCourseProgress = async (courseId) => {
    try {
      showLoading();
      const { data } = await axiosInstance.get(courseId);
      setCourseProgress(data || {});
    } catch (error) {
      console.error("Failed to fetch course progress:", error);
    } finally {
      hideLoading();
    }
  };

  const getSingleCourse = async (courseId) => {
    try {
      showLoading();
      const { data } = await axiosInstance.get(`course?id=${courseId}`);
      setCourse(data?.course || {});
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      hideLoading();
    }
  };

  const getLectures = async (courseId) => {
    try {
      showLoading();
      const { data } = await axiosInstance.get(`lectures/${courseId}`);
      setLectures(data?.lectures || []);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const contextValue = useMemo(() => ({
    userData,
    isLoading,
    courses,
    myCourse,
    courseProgress,
    course,
    lectures,
    fetchProfile,
    getCourses,
    getMyCourses,
    getCourseProgress,
    getSingleCourse,
    getLectures,
    showLoading,
    hideLoading
  }), [
    userData,
    isLoading,
    courses,
    myCourse,
    courseProgress,
    course,
    lectures
  ]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
