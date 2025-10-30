import React from "react";

export default function ProfileHeader({ user }) {
  return (
    <div className="text-center">
      <img
        src="/src/assets/user.svg"
        alt="Avatar"
        className="w-28 h-28 rounded-full border-4 border-white shadow-md mx-auto mb-4 hover:scale-105 transition-transform"
      />
      <h2 className="text-2xl font-bold tracking-tight">{user.name}</h2>
      <p className="text-sm opacity-80 mt-1">Premium User</p>
    </div>
  );
}
