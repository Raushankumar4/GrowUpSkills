import React from 'react';

const GoogleLogin = () => {
  return (
    <a href="http://localhost:8080/auth/google">
      <button className="flex items-center gap-3 px-6 py-2 bg-white border border-gray-300 rounded shadow hover:shadow-md transition-all text-gray-700 font-medium">
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google logo"
          className="w-5 h-5"
        />
        <span>Sign in with Google</span>
      </button>
    </a>
  );
};

export default GoogleLogin;
