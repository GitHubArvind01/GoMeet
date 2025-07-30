

const ScheduleMeeting = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-200 min-h-[calc(100vh-64px)] p-10 flex flex-col lg:flex-row justify-center gap-12">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold text-red-600 text-center">Schedule Meeting</h2>

        <input
          type="text"
          placeholder="Add title"
          className="w-full p-3 rounded-md bg-gray-200 focus:outline-none"
        />

        <select className="w-full p-3 rounded-md bg-gray-200 focus:outline-none">
          <option>Time zone: (UTC+05:30) India</option>
          <option>Time zone: (UTC+6:00) India</option>
          <option>(UTC+01:00) Berlin</option>
          <option>(UTC+00:00) London</option>
        </select>

        <textarea
          placeholder="Enter details for this meeting"
          className="w-full p-3 rounded-md bg-gray-200 h-24 resize-none focus:outline-none"
        />

        <div className="space-y-3">
          {/* From Date & Time */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold">FROM:</span>
            <input type="date" className="p-2 rounded-md bg-gray-200" />
            <input type="text" placeholder="1:30" className="w-20 p-2 rounded-md bg-gray-200 text-center" />
            <span className="p-2 bg-gray-200 rounded-md">PM</span>
          </div>

          {/* To Date & Time */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold">TO:</span>
            <input type="date" className="p-2 rounded-md bg-gray-200" />
            <input type="text" placeholder="2:30" className="w-20 p-2 rounded-md bg-gray-200 text-center" />
            <span className="p-2 bg-gray-200 rounded-md">PM</span>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Save</button>
          <button className="border border-black px-6 py-2 rounded-md hover:bg-gray-200 transition">Cancel</button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-bold text-red-600 text-center mb-4">Add Guests</h2>
        <input
          type="text"
          placeholder="email"
          className="w-full p-3 rounded-md bg-gray-200 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ScheduleMeeting;