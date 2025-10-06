import React, { useState} from 'react';
import { UserCircle2, LogOut, LogIn, ChevronDown, User } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const { isAuthenticated, isLoading, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 🆕 State for dropdown

  // Handler for logging out
  const handleLogout = async () => {
    try {
      await axios.post(API_BASE_URL+"/api/auth/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate('/login');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // If loading, show a simple placeholder
  if (isLoading) {
    return (
      <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm sticky top-0 z-20">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
        <img
          src="./src/assets/icon 2.png" 
          alt="App Icon"
          className="h-8"
        />
      </Link>
      
      {/* Conditional Buttons/Profile Menu Section */}
      <div className='flex gap-2 items-center'>
        
        {isAuthenticated ? (
          // --- State: LOGGED IN (Profile Dropdown) ---
          <div className="relative">
            {/* Profile Icon Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
              className="flex items-center gap-1 bg-white hover:bg-gray-100 transition text-gray-700 px-3 py-2 rounded-full border border-gray-300 font-medium"
            >
              <UserCircle2 className="h-6 w-6 text-indigo-600" />
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-30 border border-gray-200"
                onBlur={() => setIsDropdownOpen(false)} // Close when focus is lost
              >
                {/* View Profile Link */}
                <Link 
                  to="/userprofile" 
                  onClick={() => setIsDropdownOpen(false)} 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                >
                  <User className="h-4 w-4" />
                  View Profile
                </Link>

                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          // --- State: LOGGED OUT (Guest - Login/Signup Buttons) ---
          <>
            <Link to="/login">
              <button className="cursor-pointer flex items-center gap-2 bg-white hover:underline transition text-sm px-4 py-2 font-medium text-gray-700">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="cursor-pointer flex items-center gap-2 bg-white hover:bg-gray-200 transition text-sm px-4 py-2 rounded-full border border-gray-300 font-medium">
                <UserCircle2 className="h-5 w-5" />
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;