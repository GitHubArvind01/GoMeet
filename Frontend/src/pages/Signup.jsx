// import React, { useState } from 'react';
// import axios from 'axios';

// function Signup() {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSignup = async () => {
//     if (password !== confirmPassword) {
//       setMessage("❌ Passwords do not match");
//       return;
//     }

//     try {
//       console.log("Signup button clicked");
//       const response = await axios.post('http://localhost:8080/api/users/signup', {
//         email,
//         name,
//         password,
//       });
      
//       setMessage("✅ " + response.data);
//     } catch (error) {
//       setMessage("Signup failed: " + error.message);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-56.5px)] flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Sign Up</h1>

//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={e => setName(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={e => setConfirmPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <button
//             onClick={handleSignup}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
//           >
//             Sign up
//           </button>

//           {message && (
//             <p className="text-center text-sm text-red-600 mt-2">{message}</p>
//           )}
//         </div>

//         <div className="mt-6 text-center text-gray-500 text-sm">
//           Already have an account? 
//           <a href="/login">
//           <span className="text-blue-600 font-medium cursor-pointer hover:underline">Login</span>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;




import React, { useState } from 'react';
import axios from 'axios';
import LoaderDots from '../components/LoaderDots';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [awaitingVerification, setAwaitingVerification] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        email,
        username: name,
        password,
      });

      setAwaitingVerification(true);
      setMessage('✅ Signup successful! Check your email for the verification code.');
    } catch (error) {
      const errMsg = error.response?.data || 'Signup failed';
      setMessage('❌ ' + errMsg);
    }

    setLoading(false);
  };

  const handleVerify = async () => {
    setLoading(true);
    setMessage('');

    try {
      await axios.post('http://localhost:8080/auth/verify', {
        email,
        verificationCode,
      });

      setMessage('✅ Account verified! Redirecting...');
      setTimeout(() => (window.location.href = '/userprofile'), 1000);
    } catch (error) {
      const errMsg = error.response?.data || 'Verification failed';
      setMessage('❌ ' + errMsg);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-56.5px)] flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {awaitingVerification ? 'Verify Your Email' : 'User Sign Up'}
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={awaitingVerification || loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {!awaitingVerification && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          {awaitingVerification && (
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={e => setVerificationCode(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {loading && (
            <div className="flex justify-center">
              <LoaderDots />
            </div>
          )}

          <button
            onClick={awaitingVerification ? handleVerify : handleSignup}
            disabled={loading}
            className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading
              ? awaitingVerification
                ? 'Verifying...'
                : 'Signing up...'
              : awaitingVerification
              ? 'Verify'
              : 'Sign up'}
          </button>

          {message && (
            <p className={`text-center text-sm mt-2 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>

        {!awaitingVerification && (
          <div className="mt-6 text-center text-gray-500 text-sm">
            Already have an account?
            <a href="/login">
              <span className="text-blue-600 font-medium cursor-pointer hover:underline"> Login</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
