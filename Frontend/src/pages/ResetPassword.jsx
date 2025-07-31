// import React, { useState } from 'react';
// import axios from 'axios';
// import LoaderDots from '../components/LoaderDots';


// function ResetPassword() {
//   const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
//   const [email, setEmail] = useState('');
//   const [code, setCode] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleVerifyEmail = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       await axios.post('http://localhost:8080/auth/emailverify', null, { params: { email } });
//       setStep(2);
//     } catch (error) {
//       setMessage(error.response?.data || error.message);
//     }
//     setLoading(false);
//   };

//   const handleVerifyCode = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       await axios.post('http://localhost:8080/auth/verify-reset-code', {
//         email,
//         verificationCode: code,
//       });
//       setStep(3);
//     } catch (error) {
//       setMessage(error.response?.data || error.message);
//     }
//     setLoading(false);
//   };

//   const handleResetPassword = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       await axios.post('http://localhost:8080/auth/resetpass', {
//         email,
//         password: newPassword,
//       });
//       setMessage('success');
//       setStep(1);
//       setEmail('');
//       setCode('');
//       setNewPassword('');

//       setTimeout(() => {
//       window.location.href = '/';
//       }, 5000);
//     } catch (error) {
//       setMessage('Reset failed: ' + (error.response?.data || error.message));
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Reset Password</h1>
//         <div className="space-y-4">
//           {step === 1 && (
//             <>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               />
//               <button
//                 onClick={handleVerifyEmail}
//                 disabled={loading || !email}
//                 className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
//                 loading || !email
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//               >
//                 {loading ? 'Sending Code...' : 'Next'}
//               </button>
//             </>
//           )}


//           {step === 2 && (
//             <>
//               <input
//                 type="text"
//                 placeholder="Enter 6-digit code"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               />
//               <button
//                 onClick={handleVerifyCode}
//                 disabled={loading || !code}
//                 className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
//                 loading || !code
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//               >
//                 {loading ? 'Verifying...' : 'Verify Code'}
//               </button>
//             </>
//           )}

//           {step === 3 && (
//             <>
//               <input
//                 type="password"
//                 placeholder="Enter new password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               />
//               <button
//                 onClick={handleResetPassword}
//                 disabled={loading || !newPassword}
//                 className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
//                 loading || !newPassword
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//               >
//                 {loading ? 'Resetting...' : 'Reset Password'}
//               </button>
//             </>
//           )}

//           {message && <p className="text-center text-red-600 mt-2">{message}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;



// import React, { useState } from 'react';
// import axios from 'axios';

// function ResetPassword() {
//   const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
//   const [email, setEmail] = useState('');
//   const [code, setCode] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false); // New state to trigger success card

//   const handleVerifyEmail = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       await axios.post('http://localhost:8080/auth/emailverify', null, {
//         params: { email },
//       });
//       setStep(2);
//     } catch (error) {
//       setMessage(error.response?.data || error.message);
//     }
//     setLoading(false);
//   };

//   const handleVerifyCode = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       await axios.post('http://localhost:8080/auth/verify-reset-code', {
//         email,
//         verificationCode: code,
//       });
//       setStep(3);
//     } catch (error) {
//       setMessage(error.response?.data || error.message);
//     }
//     setLoading(false);
//   };

//   const handleResetPassword = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       await axios.post('http://localhost:8080/auth/resetpass', {
//         email,
//         password: newPassword,
//       });

//       setSuccess(true); // Show success card
//       setEmail('');
//       setCode('');
//       setNewPassword('');

//       setTimeout(() => {
//         window.location.href = '/';
//       }, 1000);
//     } catch (error) {
//       setMessage('Reset failed: ' + (error.response?.data || error.message));
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Reset Password</h1>
//         <div className="space-y-4">

//           {step === 1 && (
//             <>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               />
//               <button
//                 onClick={handleVerifyEmail}
//                 disabled={loading || !email}
//                 className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
//                   loading || !email
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 {loading ? 'Sending Code...' : 'Next'}
//               </button>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <input
//                 type="text"
//                 placeholder="Enter 6-digit code"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               />
//               <button
//                 onClick={handleVerifyCode}
//                 disabled={loading || !code}
//                 className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
//                   loading || !code
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-blue-600 hover:bg-blue-700'
//                 }`}
//               >
//                 {loading ? 'Verifying...' : 'Verify Code'}
//               </button>
//             </>
//           )}

//           {step === 3 && (
//             <>
//               {success ? (
//                 <div className="text-center py-10">
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
//                     alt="Success"
//                     className="mx-auto w-20 h-20 mb-4"
//                   />
//                   <h2 className="text-2xl font-semibold text-green-600">Password reset successfully</h2>
//                   <p className="text-gray-500 mt-2">Redirecting to homepage...</p>
//                 </div>
//               ) : (
//                 <>
//                   <input
//                     type="password"
//                     placeholder="Enter new password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                   />
//                   <button
//                     onClick={handleResetPassword}
//                     disabled={loading || !newPassword}
//                     className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
//                       loading || !newPassword
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-blue-600 hover:bg-blue-700'
//                     }`}
//                   >
//                     {loading ? 'Resetting...' : 'Reset Password'}
//                   </button>
//                 </>
//               )}
//             </>
//           )}

//           {message && !success && (
//             <p className="text-center text-red-600 mt-2">{message}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;




// import React, { useState } from 'react';
// import axios from 'axios';
// import LoaderDots from '../components/LoaderDots';

// function ResetPassword() {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState('');
//   const [code, setCode] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false); // control UI state

//   const handleVerifyEmail = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       await axios.post('http://localhost:8080/auth/emailverify', null, {
//         params: { email },
//       });
//       setStep(2);
//     } catch (error) {
//       setMessage(error.response?.data || error.message);
//     }
//     setLoading(false);
//   };

//   const handleVerifyCode = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       await axios.post('http://localhost:8080/auth/verify-reset-code', {
//         email,
//         verificationCode: code,
//       });
//       setStep(3);
//     } catch (error) {
//       setMessage(error.response?.data || error.message);
//     }
//     setLoading(false);
//   };

//   const handleResetPassword = async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       await axios.post('http://localhost:8080/auth/resetpass', {
//         email,
//         password: newPassword,
//       });

//       setSuccess(true); // Only now show the success card
//       setEmail('');
//       setCode('');
//       setNewPassword('');

//       setTimeout(() => {
//         window.location.href = '/';
//       }, 1000);
//     } catch (error) {
//       setMessage('Reset failed: ' + (error.response?.data || error.message));
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
//         {success ? (
//           // ✅ Success Card replaces everything
//           <div className="text-center py-10">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
//               alt="Success"
//               className="mx-auto w-20 h-20 mb-4"
//             />
//             <h2 className="text-2xl font-semibold text-green-600">Password reset successfully</h2>
//             <p className="text-gray-500 mt-2">Redirecting to homepage...</p>
//           </div>
//         ) : (
//           <>
//             <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Reset Password</h1>
//             <div className="space-y-4">
//               {step === 1 && (
//                 <>
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                   />
//                   <button
//                     onClick={handleVerifyEmail}
//                     disabled={loading || !email}
//                     className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
//                       loading || !email
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-blue-600 hover:bg-blue-700'
//                     }`}
//                   >
//                     {loading ? 'Sending Code...' : 'Next'}
//                   </button>
//                 </>
//               )}

//               {step === 2 && (
//                 <>
//                   <input
//                     type="text"
//                     placeholder="Enter 6-digit code"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                   />
//                   <button
//                     onClick={handleVerifyCode}
//                     disabled={loading || !code}
//                     className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
//                       loading || !code
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-blue-600 hover:bg-blue-700'
//                     }`}
//                   >
//                     {loading ? 'Verifying...' : 'Verify Code'}
//                   </button>
//                 </>
//               )}

//               {step === 3 && (
//                 <>
//                   <input
//                     type="password"
//                     placeholder="Enter new password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                   />
//                   <button
//                     onClick={handleResetPassword}
//                     disabled={loading || !newPassword}
//                     className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
//                       loading || !newPassword
//                         ? 'bg-gray-400 cursor-not-allowed'
//                         : 'bg-blue-600 hover:bg-blue-700'
//                     }`}
//                   >
//                     {loading ? 'Resetting...' : 'Reset Password'}
//                   </button>
//                 </>
//               )}

//               {message && (
//                 <p className="text-center text-red-600 mt-2">{message}</p>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;



// import React, { useState } from 'react';
// import LoaderDots from '../components/LoaderDots';

// const ForgetPassword = () => {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState('');
//   const [code, setCode] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleVerifyEmail = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setStep(2);
//     }, 2000);
//   };

//   const handleVerifyCode = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setStep(3);
//     }, 2000);
//   };

//   const handleResetPassword = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setStep(4); // step 4 is success card
//     }, 2000);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
//         {step === 1 && (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg mb-4"
//             />
//              {loading && <LoaderDots />}
//             <button
//               onClick={handleVerifyEmail}
//               disabled={loading || !email}
//               className={`w-full text-white py-4 rounded-lg font-medium transition duration-300 ${
//                 loading || !email
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//             >
//               Send Code
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Verify Code</h2>
//             <input
//               type="text"
//               placeholder="Enter verification code"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg mb-4"
//             />
//             <button
//               onClick={handleVerifyCode}
//               disabled={loading || !code}
//               className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
//                 loading || !code
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//             >
//               {loading ? <LoaderDots /> : 'Verify Code'}
//             </button>
//           </>
//         )}

//         {step === 3 && (
//           <>
//             <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
//             <input
//               type="password"
//               placeholder="Enter new password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg mb-4"
//             />
//             <button
//               onClick={handleResetPassword}
//               disabled={loading || !newPassword}
//               className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
//                 loading || !newPassword
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//             >
//               {loading ? <LoaderDots /> : 'Reset Password'}
//             </button>
//           </>
//         )}

//         {step === 4 && (
//           <div className="flex flex-col items-center justify-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
//               alt="Success"
//               className="w-20 h-20 mb-4"
//             />
//             <h2 className="text-2xl font-bold text-green-600 mb-2">
//               Password Reset Successfully
//             </h2>
//             <p className="text-gray-600">You can now log in with your new password.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoaderDots from '../components/LoaderDots';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const handleVerifyEmail = async () => {
    setLoading(true);
    setMessage('');
    try {
      await axios.post('http://localhost:8080/auth/emailverify', null, { params: { email } });
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data || error.message);
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setMessage('');
    try {
      await axios.post('http://localhost:8080/auth/verify-reset-code', {
        email,
        verificationCode: code,
      });
      setStep(3);
    } catch (error) {
      setMessage(error.response?.data || error.message);
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage('');
    try {
      await axios.post('http://localhost:8080/auth/resetpass', {
        email,
        password: newPassword,
      });
      setIsSuccess(true);
      setStep(0); // Hide form
      setEmail('');
      setCode('');
      setNewPassword('');
    } catch (error) {
      setMessage('Reset failed: ' + (error.response?.data || error.message));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Reset Password</h1>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center animate-fade-in">
            <img
              src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
              alt="Success"
              className="w-20 h-20 mb-4"
            />
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Password Reset Successfully
            </h2>
            <p className="text-gray-600 mb-4">You can now log in with your new password.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {step === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                {loading && <LoaderDots />}
                <button
                  onClick={handleVerifyEmail}
                  disabled={loading || !email}
                  className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
                    loading || !email
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Next
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                {loading && <LoaderDots />}
                <button
                  onClick={handleVerifyCode}
                  disabled={loading || !code}
                  className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
                    loading || !code
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                   Verify Code
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              {loading && <LoaderDots />}
                <button
                  onClick={handleResetPassword}
                  disabled={loading || !newPassword}
                  className={`w-full text-white py-2 rounded-lg font-medium transition duration-300 ${
                    loading || !newPassword
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Reset Password
                </button>
              </>
            )}

            {message && <p className="text-center text-red-600 mt-2">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
