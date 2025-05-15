import axiosInstance from '@/Axios/AxiosInstance';
import { showErrorToast, showSuccessToast } from '@/utils/ToastSimple';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true)
    try {
      const { data } = await axiosInstance.post('forgot-password', { email });
      setEmailSent(true);
      setIsLoading(false)
      showSuccessToast(data?.message)
    } catch (error) {
      setIsLoading(false)
      showErrorToast(error.response?.data?.message || 'Failed to send reset link')
      console.log(error.response?.data?.message || 'Something went wrong');
      setErrorMsg(error.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Info/Illustration */}
        <div className="hidden md:block md:w-1/2 bg-indigo-500 text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Forgot Your Password?</h2>
          <p className="text-sm">
            Don’t worry, it happens. Enter your email and we’ll send you a reset link.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Password Reset
          </h3>

          {emailSent ? (
            <div className="text-center text-green-600 text-sm">
              A password reset link has been sent to <strong>{email}</strong>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              {errorMsg && (
                <p className="text-red-500 text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}

          <div className="text-center mt-6 text-sm">
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
