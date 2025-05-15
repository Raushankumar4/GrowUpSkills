import Cookies from "js-cookie";

const getCookie = (cookieName) => {
  return Cookies.get(cookieName);
};

export default getCookie;

const token = getCookie("token");
console.log("Token:", token);
