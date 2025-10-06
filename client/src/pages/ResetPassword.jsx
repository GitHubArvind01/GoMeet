import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoaderDots from '../components/LoaderDots'; // Assuming this path is correct
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function ResetPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: Code & New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added for client-side check
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // Redirect to home page upon successful password reset
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        // Navigate to login or home page after success
        navigate('/login'); 
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  // Handler for Step 1: Send OTP to Email
  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      // API: POST to /send-reset-otp, expecting { email } in body
      const response = await axios.post(API_BASE_URL+"/api/auth/send-reset-otp", { email });
      
      if (response.data.success) {
        setStep(2);
        setMessage("OTP sent! Check your email to proceed.");
      } else {
        setMessage(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      // Display specific error message from server response or a generic one
      setMessage(error.response?.data?.message || 'Error: Could not send OTP request.');
    }
    setLoading(false);
  };

  // Handler for Step 2: Verify Code and Reset Password
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    if (!otp || !newPassword) {
      setMessage("Please enter the OTP and a new password.");
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      // API: POST to /reset-password, expecting { email, otp, newPassword } in body
      const response = await axios.post(API_BASE_URL+"/api/auth/reset-password", {
        email,
        otp, // Using 'otp' state name, which matches the server key
        newPassword,
      });

      if (response.data.success) {
        setIsSuccess(true);
        setStep(0); // Hide form and show success message
      } else {
        setMessage(response.data.message || 'Password reset failed.');
      }
    } catch (error) {
      setMessage('Reset failed: ' + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-500 transform hover:scale-[1.01]">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
          Reset Password
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          {step === 1 ? "Enter your email to receive a password reset code." : "Enter the received code and your new password."}
        </p>

        {/* Success State */}
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
            <svg className="w-20 h-20 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Password Reset Successfully!
            </h2>
            <p className="text-gray-600 mb-4 text-center">
              Redirecting to login...
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-medium shadow-md"
            >
              Go to Login
            </button>
          </div>
        ) : (
          /* Form Steps */
          <div className="space-y-4">
            {/* Step 1: Email Input */}
            {step === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />

                {loading && (
                    <div className="flex justify-center">
                      <LoaderDots />
                    </div>
                  )}

                   
                <button
                  onClick={handleSendOtp}
                  disabled={loading || !email}
                  className={`w-full text-white py-3 rounded-lg font-semibold shadow-md transition duration-300 flex items-center justify-center ${
                    loading || !email
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >                 
                  {'Send Reset Code'}
                </button>
              </>
            )}

            {/* Step 2: Code and New Password Input */}
            {step === 2 && (
              <>
                <input
                  type="text"
                  placeholder="6-Digit Reset Code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
                
                <button
                  onClick={handleResetPassword}
                  disabled={loading || !otp || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                  className={`w-full text-white py-3 rounded-lg font-semibold shadow-md transition duration-300 flex items-center justify-center ${
                    loading || !otp || !newPassword || newPassword !== confirmPassword
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {'Reset Password'}
                </button>
              </>
            )}
            
            {message && (
              <p className={`text-center mt-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;