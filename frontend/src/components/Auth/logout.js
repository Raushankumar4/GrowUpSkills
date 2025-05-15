import { showSuccessToast } from "@/utils/ToastSimple";
import axiosInstance from "../../Axios/AxiosInstance";
import removeCookie from "@/hooks/removeCookie";

export const handleLogout = async (navigate) => {
  try {
    await axiosInstance.post("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("authType");
    navigate("/login");
    removeCookie("token");
    showSuccessToast("Logout SuccessFully!");
  } catch (error) {
    console.error(error);
  }
};
