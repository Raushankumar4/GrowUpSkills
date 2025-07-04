import React from "react";

const CustomLoader = ({
  text = "Loading...",
  size = 5,
  color = "text-white",
}) => {
  return (
    <div className="flex items-center w-full justify-center space-x-2">
      <svg
        className={`animate-spin h-${size} w-${size} ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <span className={`text-sm font-medium ${color}`}>{text}</span>
    </div>
  );
};

export default CustomLoader;
