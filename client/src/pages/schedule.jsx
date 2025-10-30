import { useState } from "react";
import GuestInput from "./GuestInput";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SCHEDULE_BACKEND_URL;

const Schedule = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [fromDate, setFromDate] = useState("2025-07-21");
  const [fromTime, setFromTime] = useState("13:30");
  const [toDate, setToDate] = useState("2025-07-21");
  const [toTime, setToTime] = useState("14:30");
  const [guests, setGuests] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const clearForm = () => {
    setTitle("");
    setDetails("");
    setFromDate("2025-07-21");
    setFromTime("13:30");
    setToDate("2025-07-21");
    setToTime("14:30");
    setGuests([]);
  };

  const handleCancelClick = () => setShowConfirm(true);
  const handleConfirmYes = () => {
    clearForm();
    setShowConfirm(false);
  };
  const handleConfirmNo = () => setShowConfirm(false);

  // Show toast notification
  const showNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 5000);
  };

  // Remove notification manually
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Frontend Validation Function
  const validateForm = () => {
    if (!title.trim()) {
      showNotification("Meeting title is required.", "error");
      return false;
    }
    if (!fromDate || !fromTime || !toDate || !toTime) {
      showNotification("Please select valid start and end date/time.", "error");
      return false;
    }

    const start = new Date(`${fromDate}T${fromTime}`);
    const end = new Date(`${toDate}T${toTime}`);
    const now = new Date();

    if (isNaN(start) || isNaN(end)) {
      showNotification("Invalid date or time format.", "error");
      return false;
    }

    if (start < now) {
      showNotification("Meeting start time cannot be in the past.", "error");
      return false;
    }

    if (end <= start) {
      showNotification("End time must be after start time.", "error");
      return false;
    }

    if (guests.length === 0) {
      showNotification("Please add at least one guest.", "error");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const guest of guests) {
      if (!emailRegex.test(guest)) {
        showNotification(`Invalid guest email: ${guest}`, "error");
        return false;
      }
    }

    return true;
  };

  const handleSaveClick = async () => {
    if (!validateForm()) return;

    const payload = { title, details, fromDate, fromTime, toDate, toTime, guests };

    try {
      await axios.post(`${API_BASE_URL}/meeting/schedule`, payload);
      showNotification("Meeting scheduled successfully!", "success");
      clearForm();
    } catch (err) {
      console.error(err);
      showNotification("Failed to schedule meeting. Please try again.", "error");
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center relative">
      {/* Notifications Sidebar */}
      <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`px-4 py-2 rounded shadow-md text-white max-w-xs break-words flex justify-between items-center gap-3 ${
              notif.type === "success" ? "bg-green-500" : "bg-red-500"
            } animate-slide-in`}
          >
            <span>{notif.message}</span>
            <button className="font-bold ml-2" onClick={() => removeNotification(notif.id)}>
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-200 rounded-lg p-6 flex justify-center min-h-130 gap-10">
        {/* Left side - Schedule Meeting */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-black-600 mb-5">Schedule Meeting</h2>
          <input
            className="bg-white border-none rounded px-3 py-2 w-full text-sm mb-5"
            placeholder="Add title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select className="bg-white border-none rounded px-3 py-2 w-full text-sm mb-5">
            <option value="UTC+05:30">Time zone: (UTC+05:30) India</option>
          </select>
          <textarea
            className="bg-white border-none rounded p-3 py-2 w-full text-sm h-24 mb-5"
            placeholder="Enter details for this meeting"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <div className="flex items-center gap-2">
              <label className="font-medium">FROM:</label>
              <input
                type="date"
                className="bg-white border-none rounded px-2 py-1"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <input
                type="time"
                className="bg-white border-none rounded px-2 py-1"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-medium">TO:</label>
              <input
                type="date"
                className="bg-white border-none rounded px-2 py-1"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
              <input
                type="time"
                className="bg-white border-none rounded px-2 py-1"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="border-none bg-blue-600 text-white px-6 py-2 rounded"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="border-none bg-white border-black px-6 py-2 rounded"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Right side - Add Guests */}
        <div className="flex-1">
          <GuestInput guests={guests} setGuests={setGuests} />
        </div>
      </div>

      {/* Confirm Cancel Dialog */}
      {showConfirm && (
        <div className="absolute top-0 left-0 w-full h-full bg-green-50 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-80">
            <p className="text-lg font-medium mb-4">Are you sure you want to leave?</p>
            <div className="flex justify-center items-center gap-8">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleConfirmYes}>
                Yes
              </button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={handleConfirmNo}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind animation */}
      <style>
        {`
          @keyframes slide-in {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Schedule;
