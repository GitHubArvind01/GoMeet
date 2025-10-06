import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import LoaderDots from '../components/LoaderDots';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const [step, setStep] = useState(1); // 1: Login, 2: OTP Verification
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [unverifiedUserId, setUnverifiedUserId] = useState(null); 
  const [otpCode, setOtpCode] = useState(Array(6).fill('')); // For 6-digit OTP
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const otpInputRefs = useRef([]);

  // --- OTP Input Logic ---
  
  // Handler for pasting multi-digit codes
  const handleOtpPaste = (e) => {
    e.preventDefault();
    // Extract paste data, remove non-digits, and slice to 6 characters
    const pasteData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6);
    
    const newOtp = [...otpCode];
    
    pasteData.split('').forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    setOtpCode(newOtp);

    // After pasting, focus the next available input field
    const lastIndex = Math.min(pasteData.length, 6) - 1;
    if (otpInputRefs.current[lastIndex + 1]) {
        otpInputRefs.current[lastIndex + 1].focus();
    } else if (otpInputRefs.current[lastIndex]) {
        otpInputRefs.current[lastIndex].focus();
    }
  };

  const handleOtpChange = (element, index) => {
    // Only handle if input is a number
    if (isNaN(element.value)) return;

    const newOtp = [...otpCode];
    // Take only the last entered character if multiple are entered/pasted quickly
    newOtp[index] = element.value.slice(-1); 
    setOtpCode(newOtp);

    // Focus next input on single character entry
    if (element.value !== '' && index < 5) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Handle backspace only if the current box is empty and focus the previous box
    if (e.key === 'Backspace' && index > 0 && otpCode[index] === '') {
      e.preventDefault(); // Stop default browser backspace action if needed
      otpInputRefs.current[index - 1].focus();
      // Optional: Clear the previous box content as well
      const newOtp = [...otpCode];
      newOtp[index - 1] = '';
      setOtpCode(newOtp);
    }
  };

  const isOtpComplete = otpCode.every(digit => digit !== '');

  // --- API Handlers ---

  // Function to send the verification code (used internally and by Resend button)
  const sendVerificationCode = async () => {
    setMessage('');
    try {
      const response = await axios.post(API_BASE_URL+"/api/auth/resend-code", { email });

      if (response.data.success) {
        setStep(2); // Move to OTP entry step
        setMessage('✅ New verification code sent! Please check your email.');
        // If the server returns userId on resend, update it here too (good practice)
        if (response.data.userId) {
            setUnverifiedUserId(response.data.userId);
        }
      } else {
        setMessage('❌ Failed to send verification code: ' + (response.data.message || 'Server error.'));
      }
    } catch (error) {
      setMessage('❌ Failed to connect for verification code.');
    }
  };

  // Step 1: Handle Login Attempt
  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    setUnverifiedUserId(null); // Reset user ID state

    try {
      const response = await axios.post(API_BASE_URL+"/api/auth/login", {
        email,
        password,
      }, { withCredentials: true });

      if (response.data.success) {
        if (typeof setIsAuthenticated === 'function') {
          setIsAuthenticated(true); 
        }
        // SUCCESS CASE: Logged in and Verified
        setMessage('✅ Login successful! Redirecting...');
        setTimeout(() => (window.location.href = '/'), 1000);
      } else {
        // FAILURE CASE: Check for unverified status
        const serverMessage = response.data.message || 'Login failed.';
        
        // Check for the unverified signal (requires server fix)
        if (response.data.code === 'UNVERIFIED' || serverMessage.includes('verify your email')) {
          
          if (response.data.userId) {
            setUnverifiedUserId(response.data.userId); 
            setMessage('Account unverified. Sending a new code to your email...');
            // Immediately trigger sending the code and transition to step 2
            await sendVerificationCode();
          } else {
            // Error when server doesn't return userId for unverified user
            setMessage('❌ Server configuration error. Please ensure the server returns userId for unverified accounts.');
          }
        } else {
          // Other login errors (Invalid Password, Invalid Email)
          setMessage('❌ ' + serverMessage);
        }
      }

    } catch (error) {
      // Catch network errors or non-200 HTTP status codes
      const errMsg = error.response?.data?.message || error.message || 'Network error.';
      setMessage('❌ ' + errMsg);
    }

    setLoading(false);
  };
  
  // Step 2: Handle Account Verification
  const handleVerifyAccount = async () => {
    setLoading(true);
    setMessage('');

    const codeString = otpCode.join('');
    if (codeString.length !== 6) {
        setMessage('Please enter the full 6-digit code.');
        setLoading(false);
        return;
    }

    if (!unverifiedUserId) {
        setMessage('Critical Error: Missing user ID. Please try logging in again.');
        setLoading(false);
        setStep(1); // Go back to login form
        return;
    }

    try {
        const response = await axios.post(API_BASE_URL+"/api/auth/verify-account", { 
            userId: unverifiedUserId, 
            otp: codeString,          
        }, { withCredentials: true }); 

        if (response.data.success) {
            setMessage('✅ Verification successful! Logging you in...');
            setTimeout(() => (window.location.href = '/'), 1000); 
        } else {
            setMessage('❌ Verification failed: ' + (response.data.message || 'Invalid code.'));
        }
    } catch (error) {
        setMessage('❌ Verification error: ' + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };


  // --- JSX Rendering ---

  const renderLoginForm = () => (
    <>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          disabled={loading}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          disabled={loading}
        />

        <Link to="/resetpass">
          <span className="flex justify-end text-indigo-500 cursor-pointer text-sm hover:underline pb-1.5">Forgot Password?</span>
        </Link>
        
        {loading && (
          <div className="flex justify-center py-2">
            <LoaderDots />
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading || !email || !password}
          className={`w-full text-white py-3 rounded-lg cursor-pointer font-semibold transition duration-300 shadow-md ${
          loading || !email || !password
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
        {loading ? 'Logging in...' : 'Login'}
        </button>
    </>
  );

  const renderOtpForm = () => (
    <>
      <p className="text-center text-gray-600 mb-6">
        A 6-digit verification code has been sent to **{email}**.
      </p>
      
      {/* 6-Box OTP Input */}
      <div className="flex justify-center space-x-2 my-4">
        {otpCode.map((digit, index) => (
          <input
            key={index}
            ref={el => otpInputRefs.current[index] = el}
            type="text"
            // Added onPaste handler ONLY to the first box
            onPaste={index === 0 ? handleOtpPaste : undefined} 
            maxLength="1"
            value={digit}
            onChange={e => handleOtpChange(e.target, index)}
            onKeyDown={e => handleOtpKeyDown(e, index)}
            className="w-10 h-12 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition shadow-inner"
            disabled={loading}
          />
        ))}
      </div>

      <button
        onClick={handleVerifyAccount}
        disabled={loading || !isOtpComplete}
        className={`w-full text-white py-3 rounded-lg cursor-pointer font-semibold transition duration-300 shadow-md ${
        loading || !isOtpComplete
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? 'Verifying...' : 'Verify Account & Login'}
      </button>

      <button
        onClick={sendVerificationCode}
        disabled={loading}
        className={`w-full text-indigo-600 py-2 mt-2 rounded-lg font-medium transition duration-300 border border-indigo-200 hover:bg-indigo-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Resend Code
      </button>
    </>
  );

  return (
    <div className="h-[calc(100vh-64px)] w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 transform hover:scale-[1.005]">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {step === 1 ? 'Welcome Back' : 'Verify Your Account'}
        </h1>

        <div className="space-y-4 py-2">
          
          {step === 1 && renderLoginForm()}
          {step === 2 && renderOtpForm()}

          {message && (
            <p className={`text-center text-sm mt-4 p-2 rounded ${message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </p>
          )}
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account?
          <Link to="/signup">
            <span className="text-indigo-600 font-medium cursor-pointer hover:underline"> Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
