import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Users from './User'; // Make sure to correct case if needed
import Signup from './Signup';
import Schedule from './Schedule';
import JoinMeet from "./JoinMeet";
import ResetPassword from './ResetPassword';
import UserProfile from './UserProfile';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/resetpass" element={<ResetPassword />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/JoinMeet" element={<JoinMeet />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </BrowserRouter>
);
