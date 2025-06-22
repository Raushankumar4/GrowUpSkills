import { useAuthContext } from "@/context/AuthContext";
import { showErrorToast, showSuccessToast } from "@/utils/ToastSimple";
import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import setCookie from "@/hooks/setCookie";
import removeCookie from "@/hooks/removeCookie";
import { useUserContext } from "@/context/UserContext";
import CustomLoader from "../Loading/CustomLoader";

const ModernAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isLoading, hideLoading, showLoading } = useUserContext();
  const { setAuthToken } = useAuthContext();

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const url = isLogin
    ? `${import.meta.env.VITE_SERVER}/api/v1/login`
    : `${import.meta.env.VITE_SERVER}/api/v1/register`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let filterData = {};
    const { email, password } = userInput;
    if (isLogin) {
      filterData.email = email;
      filterData.password = password;
    }
    const authData = isLogin ? filterData : userInput;
    try {
      showLoading();
      const { data } = await axios.post(url, authData);
      if (isLogin && data) {
        removeCookie("token");
        setCookie("token", data?.token);
        setAuthToken(data?.token);
        showSuccessToast(data?.message || "Login Successfully!");
        navigate("/");
      } else {
        navigate("/verify-otp", { state: { userId: data?.userId } });
      }
    } catch (error) {
      showErrorToast(error.response.data.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-10 font-inter bg-skillhub-pattern overflow-hidden">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl z-10 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-500 rounded-full opacity-30 blur-2xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600 rounded-full opacity-30 blur-2xl animate-pulse" />

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center mb-4 md:mb-6 drop-shadow-md">
          {isLogin ? "Login to SkillHub" : "Create SkillHub Account"}
        </h3>

        <p className="text-xs sm:text-sm text-indigo-200 text-center mb-4 italic">
          Empowering learners to unlock their potential.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 z-10 relative">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-white/60" />
              <input
                type="text"
                name="username"
                value={userInput.username}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white/70"
              />
            </div>
          )}

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-white/60" />
            <input
              type="email"
              name="email"
              value={userInput.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full bg-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white/70"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-white/60" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={userInput.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white/70"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-white/60 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {isLogin && (
            <div className="text-right text-sm">
              <Link to="/forgot" className="text-indigo-300 hover:underline">
                Forgot Password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-sky-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {isLoading ? (
              <CustomLoader
                text={isLogin ? "Logging in..." : "Signing up..."}
              />
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-white/30" />
          <span className="mx-3 text-white/50 text-sm">OR</span>
          <hr className="flex-grow border-t border-white/30" />
        </div>

        <a
          href="http://localhost:8080/auth/google"
          className="flex items-center justify-center w-full border border-white/20 py-2.5 sm:py-3 rounded-lg text-white hover:bg-white/10 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </a>

        <p className="text-center text-white/80 text-sm sm:text-base mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-300 font-medium hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        <p className="text-center text-white/60 text-xs sm:text-sm mt-4 sm:mt-6">
        500+ students joined SkillHub in the last 3 months!
        </p>
      </div>
    </div>
  );
};

export default ModernAuthForm;
