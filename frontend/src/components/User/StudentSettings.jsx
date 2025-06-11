import React, { useState } from 'react';

const StudentSettings = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
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
      return;
    }

    setShowPasswordError(false);
    console.log('Saved settings:', formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setShowPasswordError(false);
  };

  const handleDeleteAccount = () => {
    // Simulate account deletion by clearing data
    setFormData({
      password: '',
      confirmPassword: '',
    });
    setAccountDeleted(true);
    setShowDeleteConfirm(false);
  };

  if (accountDeleted) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow text-center">
        <h2 className="text-2xl font-semibold text-red-600">Account Deleted</h2>
        <p className="text-gray-600 mt-2">Your profile information has been removed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 ">


      {/* Password Change */}
      <div className="mt-6 space-y-3">
        <h3 className="text-lg font-semibold">Change Password</h3>

        <input
          type="password"
          name="password"
          placeholder="New password"
          disabled={!editMode}
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded ${editMode ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'
            }`}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          disabled={!editMode}
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded ${editMode ? 'border-gray-300' : 'bg-gray-100 cursor-not-allowed'
            }`}
        />

        {showPasswordError && (
          <p className="text-red-500 text-sm">Passwords do not match.</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between items-center">
        {/* Left: Delete */}
        <div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 hover:underline text-sm"
          >
            Delete Account
          </button>
        </div>

        {/* Right: Save / Cancel / Edit */}
        <div className="space-x-2">
          {editMode ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Account Deletion</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
