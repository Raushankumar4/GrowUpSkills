import axiosInstance from '@/Axios/AxiosInstance';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [apiError, setApiError] = useState('');
  const { token } = useParams();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    setApiError('');
    if (!isValid()) return;

    try {
      const { data } = await axiosInstance.post(`reset-password/${token}`, {
        password: formData.password
      });
      console.log(data);
      setSubmitted(true);
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong';
      setApiError(msg);
      console.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="hidden md:block md:w-1/2 bg-indigo-500 text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Reset Your Password</h2>
          <p className="text-sm">
            Create a strong new password to secure your account.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Set New Password
          </h3>

          {submitted ? (
            <div className="text-center text-green-600 text-sm">
              Your password has been successfully reset.
              <div className="mt-4">
                <a href="/" className="text-indigo-600 hover:underline font-medium">
                  Return to Login
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  onChange={handleOnChange}
                  name="password"
                  value={formData.password}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"

                />
                <div
                  className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
              </div>

              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  onChange={handleOnChange}
                  value={formData.confirmPassword}
                  name="confirmPassword"
                />
                <div
                  className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </div>
                {error.confirmPassword && <p className="text-red-500 text-sm">{error.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
