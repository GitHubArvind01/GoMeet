import React, { useState } from 'react';
import axios from 'axios';

function UserFile({ user }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Welcome, {user.username}</h2>
        <div className="flex items-center space-x-3">
          <img
            src="https://www.svgrepo.com/show/7025/user.svg"
            alt="Profile"
            className="w-10 h-10 rounded-full border"
          />
          <span className="text-gray-600">{user.username}</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Account Status:</strong> {user.enabled ? 'Verified' : 'Unverified'}</p>
      </div>
    </div>
  );
}

export default UserFile;