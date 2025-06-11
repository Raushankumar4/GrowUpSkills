import React from 'react';
import { CheckCircle, Clock, Tv, Infinity } from 'lucide-react';

const CoursePage = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-white text-gray-900 max-w-6xl mx-auto p-6 lg:p-20 space-y-6 lg:space-y-0 lg:space-x-10">

      {/* Right Content - Enrollment Box (Shown first on small screens) */}
      <div className="order-1 lg:order-2 bg-white text-black rounded shadow p-4 w-full lg:max-w-xs mx-auto h-fit">
        <img src="https://via.placeholder.com/300x180" alt="Course Preview" className="rounded w-full" />
        <p className="mt-2 text-center font-semibold">Preview this course</p>

        <p className="text-2xl font-bold mt-4">
          ₹399 <span className="line-through text-gray-500 text-sm ml-2">₹799</span>
        </p>
        <p className="text-sm text-red-600 font-semibold">⏰ 3 days left at this price!</p>

        <button className="w-full bg-purple-600 text-white font-semibold py-2 rounded mt-4 hover:bg-purple-700">
          Add to cart
        </button>
        <button className="w-full border border-purple-600 text-purple-600 font-semibold py-2 rounded mt-2 hover:bg-purple-50">
          Buy now
        </button>

        <p className="text-xs text-center text-gray-500 mt-2">30-Day Money-Back Guarantee</p>

        {/* Course includes */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">This course includes:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center"><Clock className="w-4 h-4 mr-2" />5.5 hours on-demand video</li>
            <li className="flex items-center"><Tv className="w-4 h-4 mr-2" />Access on mobile and TV</li>
            <li className="flex items-center"><Infinity className="w-4 h-4 mr-2" />Full lifetime access</li>
            <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-600" />Certificate of completion</li>
          </ul>
        </div>
      </div>

      {/* Left Content */}
      <div className="order-2 lg:order-1 flex-1">
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            IT & Software {'>'} Network & Security {'>'} Cybersecurity Awareness
          </p>
          <h1 className="text-3xl font-bold mt-2">
            CyberSecurity Bootcamp: The Ultimate Beginner's Course
          </h1>
          <p className="mt-2 text-gray-700">
            Knowledge that everyone must have. Learn how to protect your personal data from hackers. Take cyber security seriously.
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Created by <a href="#" className="text-blue-600 underline">CyberProStudy Ltd.</a>
          </p>
          <p className="text-sm text-gray-500">Last updated 6/2023 • English • English [Auto]</p>
        </div>

        <div className="my-10">
          <h2 className="text-xl font-bold mb-4">Course Content</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-900">
            <li>Introduction to Web3 & ChatGPT</li>
            <li>Setting up Next.js and React.js</li>
            <li>Integrating OpenAI API</li>
            <li>Using Smart Contracts & Solidity</li>
            <li>Deploying dApp with NFTs</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">What you'll learn</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li>Understand how to protect the personal data you have recorded on your computers, laptops and mobile devices.</li>
            <li>You will understand why you should take Cybersecurity seriously.</li>
            <li>You will learn what Social Engineering is and how the hackers are using it. What the most common forms of Social Engineering are.</li>
            <li>How simple it is to secure your devices. And how this can prevent attacks and make your devices more secure.</li>
          </ul>
        </div>

        <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-md my-6">
          <img src="https://via.placeholder.com/60" alt="Instructor" className="w-14 h-14 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-gray-900">CyberProStudy Ltd.</p>
            <p className="text-sm text-gray-600">4.7 Instructor Rating • 2,120 Reviews</p>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-md shadow-md mb-6">
          <h2 className="text-lg font-semibold text-yellow-700 mb-2">Course Rating</h2>
          <div className="flex items-center gap-2 text-yellow-500">
            <span className="text-2xl font-bold">4.8</span>
            <span className="text-xl">⭐</span>
            <span className="text-sm text-gray-600">Based on 3,567 reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
