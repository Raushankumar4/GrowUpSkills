import axiosInstance from "@/Axios/AxiosInstance";
import { useUserContext } from "@/context/UserContext";
import { showErrorToast, showSuccessToast } from "@/utils/ToastSimple";
import React, { useRef, useState, useEffect } from "react";

export default function UpdateProfile() {
  const { userData, fetchProfile } = useUserContext();
  const avatarRef = useRef();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    college: "",
    gender: "",
    dob: "",
    bio: "",
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (userData) {
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      };

      setFormData({
        username: userData.username || userData?.displayName || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        college: userData.college || "",
        gender: userData.gender || "",
        dob: formatDate(userData.dob),
        bio: userData.bio || "",
        avatar: null,
      });

      setAvatarPreview(userData?.avatar || userData?.photo || "");
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProgress(0);

    if (name === "avatar" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClick = () => {
    avatarRef.current.click();
  };

  const handleSuggestBio = () => {
    const { username, college } = formData;
    const templates = [
      `Hi! I'm ${username}, a passionate learner from ${college}. I love exploring new technologies and growing my skills.`,
      `Hey there! I'm ${username}, currently studying at ${college}. I'm always up for challenges and love working on real-world projects.`,
      `I'm ${username}, a dedicated student from ${college}, enthusiastic about personal growth, learning, and collaboration.`,
      `${username} here from ${college}. I'm interested in web development, tech innovations, and making an impact through my work.`,
    ];

    const randomBio = templates[Math.floor(Math.random() * templates.length)];
    setFormData((prev) => ({ ...prev, bio: randomBio }));
    showSuccessToast("✨ AI-generated bio applied! You can still edit it.");
  };

  const handleSave = async () => {
    setIsLoading(true);
    setHasError(false);

    const payload = new FormData();

    if (formData.avatar) {
      payload.append("avatar", formData.avatar);
    }

    payload.append("username", formData.username);
    payload.append("dob", formData.dob);
    payload.append("college", formData.college);
    payload.append("mobile", formData.mobile);
    payload.append("bio", formData.bio);
    payload.append("email", formData.email);
    payload.append("gender", formData.gender);

    try {
      const { data } = await axiosInstance.put("update-profile", payload, {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
          if (percent === 100) {
            setTimeout(() => setProgress(0), 1000);
          }
        },
      });

      await fetchProfile();
      showSuccessToast(data?.message || "Profile updated successfully!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
      showErrorToast(error?.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="max-w-3xl pt-20 mx-auto px-4 py-8">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="relative">
          <img
            src={avatarPreview}
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover border-4 shadow"
          />
          <div
            onClick={handleClick}
            className="absolute bottom-0 right-0 bg-sky-500 p-2 rounded-full cursor-pointer"
          >
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M9 13h3l7-7a2.828 2.828 0 10-4-4l-7 7v3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 21H4a1 1 0 01-1-1v-6a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1z"
              />
            </svg>
          </div>
          <input
            onChange={handleChange}
            name="avatar"
            ref={avatarRef}
            className="hidden"
            type="file"
            accept="image/*"
          />
        </div>

        {/* Form */}
        <div className="mt-8 w-full p-6 rounded-xl bg-white shadow space-y-6">
          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email ✔
              </label>
              <input
                name="email"
                value={formData.email}
                disabled
                className="w-full mt-1 border border-gray-300 rounded px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mobile *
              </label>
              <div className="flex mt-1">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 text-gray-600 text-sm rounded-l-md">
                  🇮🇳 +91
                </span>
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-r-md px-3 py-2 focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* College */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                College Name *
              </label>
              <input
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Gender */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <div className="flex items-center gap-6">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="text-sky-600"
                    />
                    <span className="ml-2 capitalize">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* DOB */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Bio with AI Suggestion */}
          <div>
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-sky-500"
              placeholder="Tell us about yourself..."
            />
            <button
              onClick={handleSuggestBio}
              type="button"
              className="mt-2 text-sm text-sky-600 hover:underline"
            >
              ✨ Suggest Bio with AI
            </button>
          </div>

          {/* Save */}
          <div className="text-right mt-4">
            {progress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden relative">
                <div
                  className="bg-sky-500 h-4 transition-all duration-300 text-white text-xs flex items-center justify-center"
                  style={{ width: `${progress}%` }}
                >
                  <span className="px-1">{progress}%</span>
                </div>
              </div>
            )}
            <button
              disabled={isLoading}
              onClick={handleSave}
              className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 transition disabled:opacity-50"
            >
              {isLoading ? "Updating..." : hasError ? "Retry" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
