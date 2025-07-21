import React, { useState } from "react";
import toast from "react-hot-toast";

const StudentSettings = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      setShowPasswordError(true);
      toast.error("Passwords do not match.");
      return;
    }

    setShowPasswordError(false);
    setEditMode(false);

    // Simulated save logic
    toast.success("Settings updated successfully.");
    console.log("Saved settings:", formData);
  };

  const handleCancel = () => {
    setEditMode(false);
    setShowPasswordError(false);
    toast("Edit cancelled.");
  };

  const handleDeleteAccount = () => {
    setFormData({
      password: "",
      confirmPassword: "",
    });
    setAccountDeleted(true);
    setShowDeleteConfirm(false);
    toast.success("Account deleted permanently.");
  };

  if (accountDeleted) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg text-center border border-red-200">
        <h2 className="text-2xl font-bold text-red-600">Account Deleted</h2>
        <p className="text-gray-500 mt-2">
          Your profile information has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-sky-600 mb-6">
        Account Settings
      </h2>

      {/* Change Password */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>

        <input
          type="password"
          name="password"
          placeholder="New password"
          disabled={!editMode}
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border transition ${
            editMode
              ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          disabled={!editMode}
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border transition ${
            editMode
              ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        />
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-red-600 hover:text-red-700 hover:underline text-sm"
        >
          Delete Account
        </button>

        <div className="space-x-2">
          {editMode ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Account Deletion
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSettings;
