import React, { useState } from 'react';
import axios from 'axios';
import LoaderDots from '../components/LoaderDots';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });

      setMessage('✅ Login successful! Redirecting...');
      setTimeout(() => (window.location.href = '/userprofile'), 1000);
    } catch (error) {
      const errMsg = error.response?.data || 'Login failed';
      setMessage('❌ ' + errMsg);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-56.5px)] flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">User Login</h1>

        <div className="space-y-4 py-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <a href="/resetpass">
            <span className="flex justify-end text-blue-500 text-sm hover:underline pb-1.5">Forgot Password?</span>
          </a>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />

          {loading && (
            <div className="flex justify-center">
              <LoaderDots />
            </div>
          )}

          <button
          onClick={handleLogin}
          disabled={loading || !email || !password}
          className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
          loading || !email || !password
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
          }`}
          >
          {loading ? 'Logging in...' : 'Login'}
          </button>


          {message && (
            <p className={`text-center text-sm mt-2 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account?
          <a href="/signup">
            <span className="text-blue-600 font-medium cursor-pointer hover:underline"> Sign up</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;