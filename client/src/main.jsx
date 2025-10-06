import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import Schedule from './Schedule';
import JoinMeet from "./JoinMeet";
import ResetPassword from './ResetPassword';
import UserProfile from './UserProfile';
import ProtectedRoute from "./ProtectedRoute";
import AuthRedirect from "./AuthRedirect";
import { AuthProvider } from './AuthContext'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route 
          path="/signup" 
          element={<AuthRedirect><Signup /></AuthRedirect>} 
        />
        <Route 
          path="/login" 
          element={<AuthRedirect><Login /></AuthRedirect>} 
        />
        <Route path="/resetpass" element={<ResetPassword />} />
        <Route path="/JoinMeet" element={<JoinMeet />}/>

        {/* Protected */}
        <Route
          path="/userprofile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          }
        />
      </Routes>
  </BrowserRouter>
  </AuthProvider>
);
