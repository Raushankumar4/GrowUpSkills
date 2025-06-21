import React from "react";
import { GraduationCap } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-900 text-center px-4">
      {/* Animated Graduation Icon */}
      <div className="animate-bounce mb-4">
        <GraduationCap className="w-14 h-14 text-purple-600 dark:text-purple-400" />
      </div>

      {/* Loading Text */}
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        SkillHub is preparing your content...
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Please wait while we load your personalized learning experience. 🚀
      </p>

      {/* Animated dots */}
      <div className="mt-6 flex gap-2">
        <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce delay-150"></span>
        <span className="w-3 h-3 bg-purple-600 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
};

export default Loading;
