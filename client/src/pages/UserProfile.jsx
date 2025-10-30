import React from "react";
import ProfileHeader from '../components/ProfileHeader';
import ProfileActions from '../components/ProfileActions';
import MeetingsList from '../components/MeetingsList';

export default function UserProfile({ user, handleLogout }) {
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-medium text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-purple-100 to-indigo-200 flex justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]">

        {/* Left side: Profile Info */}
        <div className="md:w-1/3 bg-gradient-to-b from-indigo-500 to-purple-600 text-white flex flex-col items-center p-8 space-y-4">
          <ProfileHeader user={user} />
          <ProfileActions handleLogout={handleLogout} />
        </div>

        {/* Right side: Meetings section */}
        <div className="md:w-2/3 p-8 bg-gray-50">
          <MeetingsList user={user} />
        </div>
      </div>
    </div>
  );
}
