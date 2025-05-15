import React, { useState } from 'react';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with real OTP verification logic
    if (otp === '123456') {
      setVerified(true);
    } else {
      alert('Invalid OTP');
    }
  };

  const handleResend = () => {
    alert('OTP resent to your email or phone.');
    // Trigger resend OTP API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left - Theme/Info */}
        <div className="hidden md:block md:w-1/2 bg-indigo-500 text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Verify OTP</h2>
          <p className="text-sm">
            Enter the 6-digit code sent to your email or phone to continue.
          </p>
        </div>

        {/* Right - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            OTP Verification
          </h3>

          {verified ? (
            <div className="text-center text-green-600 text-sm">
              ✅ OTP Verified Successfully!
              <div className="mt-4">
                <a href="/" className="text-indigo-600 hover:underline font-medium">
                  Continue to Login
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                className="w-full text-center tracking-widest font-mono text-lg px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Verify OTP
              </button>

              <p className="text-center text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Resend OTP
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
