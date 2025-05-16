import getCookie from "@/hooks/getCookie";
import axios from "axios";

export const server = import.meta.env.VITE_SERVER;

const axiosInstance = axios.create({
  baseURL: `${server}/api/v1/`,
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    console.log("Token", token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
