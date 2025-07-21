import axiosInstance from "@/Axios/AxiosInstance";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [apiError, setApiError] = useState("");
  const { token } = useParams();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = () => {
    let newError = {};
    if (!formData.password) {
      newError.password = "Password is required!";
    }
    if (!formData.confirmPassword) {
      newError.confirmPassword = "Confirm password is required!";
    } else if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match!";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!isValid()) return;

    try {
      const { data } = await axiosInstance.post(`reset-password/${token}`, {
        password: formData.password,
      });
      console.log(data);
      setSubmitted(true);
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      setApiError(msg);
      console.error(msg);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-10 font-inter bg-skillhub-pattern overflow-hidden">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl z-10 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-600 rounded-full opacity-30 blur-2xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600 rounded-full opacity-30 blur-2xl animate-pulse" />

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center mb-4 md:mb-6 drop-shadow-md">
          Reset Password
        </h3>

        <p className="text-xs sm:text-sm text-indigo-200 text-center mb-6 italic">
          Create a new password to secure your SkillHub account.
        </p>

        {submitted ? (
          <div className="text-center text-green-400 text-sm">
            Your password has been successfully reset.
            <div className="mt-4">
              <a
                href="/"
                className="text-indigo-300 hover:underline font-medium"
              >
                Return to Login
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 z-10 relative">
            {apiError && (
              <p className="text-red-400 text-sm text-center">{apiError}</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                onChange={handleOnChange}
                name="password"
                value={formData.password}
                className="w-full bg-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white/70"
              />
              <div
                className="absolute right-3 top-3 text-white/60 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {error.password && (
                <p className="text-red-400 text-sm mt-1">{error.password}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={handleOnChange}
                name="confirmPassword"
                value={formData.confirmPassword}
                className="w-full bg-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white/70"
              />
              <div
                className="absolute right-3 top-3 text-white/60 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </div>
              {error.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {error.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-sky-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Reset Password
            </button>
          </form>
        )}

        <p className="text-center text-white/60 text-xs sm:text-sm mt-6">
          Need help? Contact{" "}
          <span className="underline">support@skillhub.com</span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
