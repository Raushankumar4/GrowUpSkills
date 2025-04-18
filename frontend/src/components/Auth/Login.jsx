import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Axios/AxiosInstance';
import { FaIdCard, FaUserGraduate, FaBirthdayCake } from 'react-icons/fa';
import { useAuthContext } from "../../context/AuthContext";


const Login = () => {
  const [formData, setFormData] = useState({ loginOption: 'enrollment', enrollment: '', studentID: '', dob: '' });
  const [error, setError] = useState({});
  const { setAuthToken, authToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate('/profile', { replace: true });
    }
  }, [authToken, navigate]);

  const isValid = () => {
    let newErrors = {};
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (formData.loginOption === 'enrollment' && !formData.enrollment) newErrors.enrollment = 'Enrollment No is required';
    if (formData.loginOption === 'studentID' && !formData.studentID) newErrors.studentID = 'Student ID is required';
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    const { loginOption, enrollment, studentID, dob } = formData;
    let filteredData = { loginOption, dob };

    if (loginOption === 'enrollment') filteredData.enrollment = enrollment;
    else filteredData.studentID = studentID;

    try {
      const { data } = await axiosInstance.post('student-login', filteredData);
      localStorage.setItem('token', data?.token);
      setAuthToken(data?.token);
      navigate('/profile', { replace: true });
    } catch (err) {
      setError({ server: err.response?.data?.message || 'Login failed. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">🎓 Student Login</h1>

        <div className="flex justify-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, loginOption: 'enrollment' })}
            className={`px-4 py-1 rounded-full ${formData.loginOption === 'enrollment'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
              }`}
          >
            Use Enrollment No
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, loginOption: 'studentID' })}
            className={`px-4 py-1 rounded-full ${formData.loginOption === 'studentID'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
              }`}
          >
            Use Student ID
          </button>
        </div>

        <form onSubmit={handleOnSubmit} className="space-y-4">
          {formData.loginOption === 'enrollment' && (
            <div>
              <label className="block text-sm mb-1 font-medium">Enrollment No</label>
              <div className="flex items-center bg-white border rounded px-3 py-2">
                <FaUserGraduate className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="enrollment"
                  placeholder="Enter Enrollment No"
                  value={formData.enrollment}
                  onChange={handleOnChange}
                  className="flex-1 outline-none"
                />
              </div>
              {error.enrollment && <p className="text-sm text-red-500 mt-1">{error.enrollment}</p>}
            </div>
          )}

          {formData.loginOption === 'studentID' && (
            <div>
              <label className="block text-sm mb-1 font-medium">Student ID</label>
              <div className="flex items-center bg-white border rounded px-3 py-2">
                <FaIdCard className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="studentID"
                  placeholder="Enter Student ID"
                  value={formData.studentID}
                  onChange={handleOnChange}
                  className="flex-1 outline-none"
                />
              </div>
              {error.studentID && <p className="text-sm text-red-500 mt-1">{error.studentID}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm mb-1 font-medium">Date of Birth</label>
            <div className="flex items-center bg-white border rounded px-3 py-2">
              <FaBirthdayCake className="text-gray-500 mr-2" />
              <input
                type="text"
                name="dob"
                placeholder="YYYY-MM-DD"
                value={formData.dob}
                onChange={handleOnChange}
                className="flex-1 outline-none"
              />
            </div>
            {error.dob && <p className="text-sm text-red-500 mt-1">{error.dob}</p>}
          </div>

          {error.server && <p className="text-center text-sm text-red-600">{error.server}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-center text-gray-600 mt-6">
          © {new Date().getFullYear()}  All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
