import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../Axios/AxiosInstance";
import getCookie from "@/hooks/getCookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [myCourse, setMyCourse] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});
  const [course, setCourse] = useState({});
  const [lectures, setLectures] = useState([]);

  const authType = localStorage.getItem("authType")

  const url =
    authType === "local"
      ? "profile"
      : authType === "google"
        ? "http://localhost:8080/auth/user"
        : "profile";

  const fetchProfile = async () => {
    setLoadingUser(true)
    try {
      if (authType === "local") {
        const { data } = await axiosInstance.get(url)
        setUserData(data?.user?.user)
      } else {
        const { data } = await axiosInstance.get(url)
        setUserData(data?.user)
      }
      setLoadingUser(false)
    } catch (err) {
      setUserData(null)
      console.error("Failed to fetch user profile", err);
    } finally {
      setLoadingUser(false);
    }
  };
  useEffect(() => {
    fetchProfile()
  }, [])

  const getCourses = async () => {
    try {
      const { data } = await axiosInstance.get("get-all-course");
      setCourses(data?.course);
    } catch (error) {
      console.error("Failed to fetch", err);
    }
  };

  const getMyCourses = async () => {
    try {
      const { data } = await axiosInstance.get("my-course");
      setMyCourse(data?.course);
    } catch (error) {
      console.error("Failed to fetch", err);
    }
  };
  const getCourseProgress = async (courseId) => {
    try {
      const { data } = await axiosInstance.get(courseId);
      setCourseProgress(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSingleCourse = async (courseId) => {
    try {
      const { data } = await axiosInstance.get(`course?id=${courseId}`);
      setCourse(data?.course || {});
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  }

  const getLectures = async (courseId) => {
    try {
      const { data } = await axiosInstance.get(`lectures/${courseId}`);
      setLectures(data?.lectures || []);
      console.log(data);
      
      if (data?.lectures?.length > 0) {
        setSelectedLecture(data.lectures[0]);
      }
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };
  
  return (
    <UserContext.Provider value={{ userData, loadingUser, getCourses, fetchProfile, courses, myCourse, getMyCourses, getCourseProgress, courseProgress, getSingleCourse, course,getLectures,lectures }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
