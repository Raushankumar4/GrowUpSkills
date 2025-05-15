import Cookies from "js-cookie";

const setCookie = (cookiename, token) => {
  Cookies.set(cookiename, token, {
    expires: 1,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export default setCookie;
