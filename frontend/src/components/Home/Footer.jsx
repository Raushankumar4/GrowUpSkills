import React from "react";
import { FaLinkedin, FaYoutube, FaTelegramPlane } from "react-icons/fa";
import { MdLocationOn, MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#0e0b12] text-white pt-12 pb-4 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Tagline */}
        <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-6">
          Elevate your skills! Seamlessly blend the worlds of learning & career
          together for a future full of{" "}
          <span className="text-yellow-400">limitless growth</span> and{" "}
          <span className="text-sky-400">opportunities</span>.
        </h2>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
          {/* Contact */}
          <div>
            <img
              src="/SkillHub.png"
              alt="SkillHub Logo"
              className="w-28 mb-4"
            />
            <p>Contact Us: +91 9876543210</p>
            <p className="mt-1 text-sm">
              2nd Floor, Startup Incubation Center, Sector 75, Noida, UP -
              201301
            </p>
            <div className="flex items-center gap-2 mt-2">
              <MdEmail className="text-xl" />
              <p className="text-sm">support@skillhub.in</p>
            </div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/60/ISO_Certified.png"
              alt="ISO certified"
              className="w-12 mt-4"
            />
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-3 border-b border-pink-400 inline-block pb-1">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>About SkillHub</li>
              <li>Contact</li>
              <li>FAQs</li>
              <li>Blog</li>
              <li>Career Support</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-3 border-b border-pink-400 inline-block pb-1">
              Programs
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Web Development</li>
              <li>Data Science</li>
              <li>Cybersecurity</li>
              <li>UI/UX Design</li>
              <li>Internship + Training</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-3 border-b border-pink-400 inline-block pb-1">
              Follow Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FaLinkedin className="text-xl" />
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaYoutube className="text-xl" />
                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                  YouTube
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaTelegramPlane className="text-xl" />
                <a href="https://t.me" target="_blank" rel="noreferrer">
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400">
          <p>© 2025 SkillHub. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
