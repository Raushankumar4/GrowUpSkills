import React, { useState } from "react";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const steps = ["About You", "Preferences", "Details"];

const NeedHelpForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    background: "",
    courseType: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => step < 3 && setStep(step + 1);
  const handleBack = () => step > 1 && setStep(step - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you soon.");
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 transition";

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#e0f7ff] to-[#f0fcff] dark:from-zinc-950 dark:to-zinc-950 flex flex-col lg:flex-row items-center justify-center px-6 py-16 relative">
      {/* Background Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="relative w-[400px] h-[400px]">
          <div className="absolute top-1/2 left-1/2 w-full h-full border-[6px] border-dashed border-sky-300 dark:border-sky-700 rounded-full animate-spin-slow -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-sky-500 rounded-full animate-ping" />
        </div>
      </div>

      {/* Left Text */}
      <div className="lg:w-1/2 px-6 text-center lg:text-left z-10">
        <h1 className="text-5xl font-extrabold text-sky-600 dark:text-sky-400 mb-4 leading-snug">
          Need Career <span className="text-yellow-500">Advice?</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-md">
          SkillHub mentors are here to guide you on the best learning path to
          boost your future.
        </p>
      </div>

      {/* Right Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 p-10 rounded-3xl shadow-xl w-full max-w-xl mt-10 lg:mt-0 z-10 border border-gray-100 dark:border-zinc-800"
      >
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-10">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = step > stepNumber;

            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-sm mb-1 transition-all duration-300 ${
                    isActive
                      ? "bg-sky-500 scale-110 shadow-md"
                      : "bg-gray-300 dark:bg-zinc-700"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive
                      ? "text-sky-600 dark:text-sky-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Forms */}
        {step === 1 && (
          <div className="space-y-6">
            <label className="block text-gray-800 dark:text-gray-100 font-semibold mb-1">
              What's your background?
            </label>
            <select
              name="background"
              value={formData.background}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select Background</option>
              <option value="Student">Student</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Career Switcher">Career Switcher</option>
            </select>
            <ButtonNext onClick={handleNext} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <label className="block text-gray-800 dark:text-gray-100 font-semibold mb-1">
              What kind of course are you looking for?
            </label>
            <select
              name="courseType"
              value={formData.courseType}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select Course Type</option>
              <option value="Online Degree">Online Degree</option>
              <option value="Bootcamp">Bootcamp</option>
              <option value="Internship + Training">
                Internship + Training
              </option>
            </select>
            <div className="flex justify-between">
              <ButtonBack onClick={handleBack} />
              <ButtonNext onClick={handleNext} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              className={inputClass}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={inputClass}
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className={inputClass}
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Any specific queries or goals? (Optional)"
              className={inputClass}
            />
            <div className="flex justify-between items-center">
              <ButtonBack onClick={handleBack} />
              <button
                type="submit"
                className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 shadow-md transition"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// ✅ Buttons
const ButtonNext = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center gap-2 w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 transition"
  >
    Continue <ArrowRight className="w-4 h-4" />
  </button>
);

const ButtonBack = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
  >
    <ArrowLeft className="w-4 h-4" /> Back
  </button>
);

export default NeedHelpForm;
