import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../Axios/AxiosInstance";
import getCookie from "@/hooks/getCookie";
import { showSuccessToast } from "@/utils/ToastSimple";
import axios from "axios";

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

  console.log(import.meta.env.VITE_SERVER);


  // const url =
  //   authType === "local"
  //     ? "profile"
  //     : authType === "google"
  //       ? `${import.meta.env.VITE_SERVER}/auth/user`
  //       : "profile";

  const fetchProfile = async () => {
    setLoadingUser(true)
    try {
      const { data } = await axiosInstance.get("profile")
      setUserData(data?.user)
      setLoadingUser(false)
    } catch (err) {
      setUserData(null)
      console.log("Failed to fetch user profile", err);
    } finally {
      setLoadingUser(false);
    }
  };


  const getCourses = async () => {
    try {
      const { data } = await axiosInstance.get("get-all-course");
      setCourses(data?.course);
    } catch (error) {
      console.log("Failed to fetch", error);
    }
  };

  const getMyCourses = async () => {
    try {
      const { data } = await axiosInstance.get("my-course");
      setMyCourse(data?.course);
    } catch (error) {
      console.log("Failed to fetch", error);
    }
  };
  const getCourseProgress = async (courseId) => {
    try {
      const { data } = await axiosInstance.get(courseId);
      setCourseProgress(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleCourse = async (courseId) => {
    try {
      const { data } = await axiosInstance.get(`course?id=${courseId}`);
      setCourse(data?.course || {});
    } catch (error) {
      console.log('Error fetching course:', error);
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
      console.log('Error fetching lectures:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, loadingUser, getCourses, fetchProfile, courses, myCourse, getMyCourses, getCourseProgress, courseProgress, getSingleCourse, course, getLectures, lectures }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
