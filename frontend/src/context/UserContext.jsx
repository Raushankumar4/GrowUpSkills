import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../Axios/AxiosInstance";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);


  const fetchProfile = async () => {
    try {
      const { data } = await axiosInstance.get("profile");
      setUserData(data?.user);
    } catch (err) {
      console.error("Failed to fetch user profile", err);
      setUserData(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const getCourses = async () => {
    try {
      const { data } = await axiosInstance.get("get-all-course");
      setCourses(data?.course);
    } catch (error) {
      console.error("Failed to fetch", err);
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, loadingUser, getCourses, fetchProfile, courses }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
