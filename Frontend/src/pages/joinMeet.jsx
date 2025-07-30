
const JoinMeeting = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
      <div className="bg-white px-8 py-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Join a meeting with ID</h2>
        
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Meeting ID</label>
          <input
            type="text"
            placeholder="Enter Meeting ID"
            className="w-full px-4 py-2 bg-gray-300 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Meeting Passcode</label>
          <input
            type="password"
            placeholder="Enter Passcode"
            className="w-full px-4 py-2 bg-gray-300 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-2 rounded-md transition duration-200">
          Join a meeting
        </button>
      </div>
    </div>
  );
};

export default JoinMeeting;