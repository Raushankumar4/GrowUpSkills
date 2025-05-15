import React, { useState } from "react";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    name: "Raushan Gupta Unofficial",
    email: "raushanguptaunofficial@gmail.com",
    mobile: "9258423983",
    college: "subharti engineering college meerut",
    gender: "male",
    dob: "2000-01-01",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Perform validation, API call, etc.
    console.log("Saved Data:", formData);
  };

  return (
    <div className="max-w-3xl pt-20 mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="relative">
          <img
            src="https://i.pinimg.com/originals/8c/2b/08/8c2b08fd3b64011234b011b408cf6a6c.jpg"
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover border-4  shadow"
          />
          <div className="absolute bottom-0 right-0 bg-gray-300 p-2 rounded-full cursor-pointer">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l7-7a2.828 2.828 0 10-4-4l-7 7v3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21H4a1 1 0 01-1-1v-6a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1z" />
            </svg>
          </div>
        </div>

        {/* Form */}
        <div className="mt-8 w-full p-6 rounded-xl  space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              type="text"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email ✔</label>
            <input
              name="email"
              value={formData.email}
              disabled
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 bg-gray-100"
              type="email"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile *</label>
            <div className="flex mt-1">
              <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 text-gray-600 text-sm rounded-l-md">
                🇮🇳 +91
              </span>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-r-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                type="tel"
                required
              />
            </div>
          </div>

          {/* College */}
          <div>
            <label className="block text-sm font-medium text-gray-700">College Name *</label>
            <input
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              type="text"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="text-blue-600"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="text-pink-500"
                />
                <span className="ml-2">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleChange}
                  className="text-gray-600"
                />
                <span className="ml-2">Other</span>
              </label>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          {/* Password Update */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                type="password"
                className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                type="password"
                className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="text-right">
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
