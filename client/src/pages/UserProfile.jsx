import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handler for logging out
  const handleLogout = async () => {
    try {
      // Must have to include withCredentials to send the 'token' cookie for clearance
      const response = await axios.post(
        API_BASE_URL+"/api/auth/logout", 
        {}, 
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate('/login');
      } else {
        setError("Logout failed: " + response.data.message);
      }
    } catch (err) {
      console.error("Error during logout:", err);
      setError('An error occurred during logout.');
    }
  };

  // Effect to fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API_BASE_URL+"/api/user/data", { 
          withCredentials: true 
        });

        if (response.data.success) {
          setUser(response.data.userData);
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError('Failed to load user data. Redirecting to login.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <p className="text-center p-8 text-lg font-medium text-indigo-600">Loading user profile...</p>; 
  }

  if (error || !user) {
    return <p className="text-center p-8 text-xl font-semibold text-red-600">{error}</p>;
  }
  
  // Premium UI Design
  return (
    <div className="flex-1 h-[calc(100vh-64px)] bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transition-all duration-300 hover:shadow-3xl">
        
        {/* Header Section */}
        <div className="flex flex-col items-center border-b pb-6 mb-6">
          <img
            src="/src/assets/user.svg"
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full border-4 border-indigo-500 p-1 mb-4 shadow-lg transition-transform hover:scale-105"
          />
          <h2 className="text-3xl font-extrabold text-gray-800">
            Welcome, {user.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Your Premium Account Dashboard
          </p>
        </div>

        {/* Profile Details Grid */}
        <div className="space-y-4">
          
          {/* Email */}
          <div className="flex justify-between items-center p-4 bg-indigo-50/50 rounded-lg border border-indigo-200/50">
            <p className="text-gray-600 font-medium flex items-center">
              <span className="text-indigo-600 mr-2">📧</span> Email:
            </p>
            <p className="text-gray-800 font-semibold">{user.email}</p>
          </div>

          {/* Status */}
          <div className={`flex justify-between items-center p-4 rounded-lg border ${
            user.isAccountVerified 
              ? 'bg-green-50/50 border-green-200/50' 
              : 'bg-yellow-50/50 border-yellow-200/50'
          }`}>
            <p className="text-gray-600 font-medium flex items-center">
              <span className="text-indigo-600 mr-2">✅</span> Account Status:
            </p>
            <p className={`font-bold ${
              user.isAccountVerified ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {user.isAccountVerified ? 'Verified' : 'Unverified'}
            </p>
          </div>
          
        </div>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default UserProfile;