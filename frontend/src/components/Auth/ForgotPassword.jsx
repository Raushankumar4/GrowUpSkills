import axiosInstance from "@/Axios/AxiosInstance";
import { showErrorToast, showSuccessToast } from "@/utils/ToastSimple";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post("forgot-password", { email });
      setEmailSent(true);
      setIsLoading(false);
      showSuccessToast(data?.message);
    } catch (error) {
      setIsLoading(false);
      showErrorToast(
        error.response?.data?.message || "Failed to send reset link"
      );
      setErrorMsg(error.response?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-10 font-inter bg-skillhub-pattern overflow-hidden">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl z-10 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-500 rounded-full opacity-30 blur-2xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600 rounded-full opacity-30 blur-2xl animate-pulse" />

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center mb-4 md:mb-6 drop-shadow-md">
          Forgot Password?
        </h3>

        <p className="text-xs sm:text-sm text-indigo-200 text-center mb-6 italic">
          No worries! We'll send you a reset link.
        </p>

        {emailSent ? (
          <div className="text-center text-green-400 text-sm">
            A password reset link has been sent to <strong>{email}</strong>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 z-10 relative">
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-white/70"
              />
            </div>

            {errorMsg && (
              <p className="text-red-400 text-sm text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 to-sky-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="text-center mt-6 text-sm sm:text-base">
          <Link
            to="/login"
            className="text-indigo-300 hover:underline font-medium"
          >
            Back to Login
          </Link>
        </div>

        <p className="text-center text-white/60 text-xs sm:text-sm mt-6">
          Still stuck? Contact support at{" "} <br />
          <span className="underline">help@skillhub.com</span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;