import { useAuthContext } from "@/context/AuthContext";
import { useUserContext } from "@/context/UserContext";
import { showErrorToast, showSuccessToast } from "@/utils/ToastSimple";
import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import setCookie from "@/hooks/setCookie";
import removeCookie from "@/hooks/removeCookie";



const ModernAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { fetchProfile } = useUserContext()

  const { setAuthType, setAuthToken } = useAuthContext();
  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const url = isLogin
    ? "http://localhost:8080/api/v1/login"
    : "http://localhost:8080/api/v1/register";

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
      const { data } = await axios.post(url, authData);
      if (data && isLogin) {
        removeCookie("token")
        setCookie("token", JSON.stringify(data?.token))
      }
      localStorage.setItem("token", data?.token);
      setAuthToken(data?.token)
      setAuthType(data?.authType)
      localStorage.setItem("authType", data?.authType)
      await fetchProfile()
      showSuccessToast(data?.message);
      if (isLogin) {
        navigate("/");
      } else {
        navigate(-1);
      }
      console.log(data);
    } catch (error) {
      showErrorToast(error.response.data.message);
      console.log(error.response.data.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Image or Gradient */}
        <div className="hidden md:block md:w-1/2 bg-indigo-500 text-white p-8">
          <h2 className="text-3xl font-bold mb-4">
            {isLogin ? "Welcome Back!" : "Join Us Today"}
          </h2>
          <p className="text-sm">
            {isLogin
              ? "Enter your details to login and continue"
              : "Fill in your info to create a new account"}
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            {isLogin ? "Login to Account" : "Create Account"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                name="username"
                value={userInput.username}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              value={userInput.email}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <div className="relative">
              <input
                name="password"
                onChange={handleChange}
                value={userInput.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <div
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <Link to="/forgot" className="text-sm text-indigo-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            <a href="http://localhost:8080/auth/google">Continue with Google</a>
          </button>

          <p className="text-center mt-6 text-sm text-gray-700">
            {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 font-medium hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModernAuthForm;
