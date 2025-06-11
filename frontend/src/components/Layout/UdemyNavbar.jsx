import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Globe } from 'lucide-react';

const UdemyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-black">
            <span className="text-purple-600">u</span>demy
          </h1>
          <nav className="hidden md:flex space-x-4 text-sm font-medium text-gray-700">
            <a href="#">Explore</a>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex-1 hidden lg:flex mx-4">
          <input
            type="text"
            placeholder="Find your next course by skill, topic, or instructor"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-4 text-sm text-gray-700">
            <a href="#">Plans & Pricing</a>
            <a href="#">Udemy Business</a>
            <a href="#">Teach on Udemy</a>
          </nav>
          <ShoppingCart className="w-5 h-5 hidden md:block" />
          <button className="text-purple-600 border border-purple-600 rounded px-4 py-1 text-sm font-semibold hover:bg-purple-50">
            Log in
          </button>
          <button className="bg-purple-600 text-white rounded px-4 py-1 text-sm font-semibold hover:bg-purple-700">
            Sign up
          </button>
          <Globe className="w-5 h-5 text-gray-600" />
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
          <input
            type="text"
            placeholder="Search courses"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <nav className="flex flex-col space-y-1 text-sm text-gray-700 mt-2">
            <a href="#">Explore</a>
            <a href="#">Plans & Pricing</a>
            <a href="#">Udemy Business</a>
            <a href="#">Teach on Udemy</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default UdemyNavbar;
