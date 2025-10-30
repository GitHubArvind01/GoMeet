import React from "react";

export default function ProfileActions({ handleLogout }) {
  return (
    <div className="mt-6 space-y-3 w-full">
      <button className="w-full bg-white text-indigo-600 font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-50 transition-all">
        📅 Schedule Meeting
      </button>

      <button className="w-full bg-white text-indigo-600 font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-50 transition-all">
        🗂 Manage Meetings
      </button>

      <button
        onClick={handleLogout}
        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg shadow-md transition-all"
      >
        Log Out
      </button>
    </div>
  );
}
