import { useState } from "react";
import GuestInput from "./GuestInput";

const schedule = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [fromDate, setFromDate] = useState("2025-07-21");
  const [fromTime, setFromTime] = useState("13:30");
  const [toDate, setToDate] = useState("2025-07-21");
  const [toTime, setToTime] = useState("14:30");
  const [guests, setGuests] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false); // toggle for confirmation box

  const clearForm = () => {
    setTitle("");
    setDetails("");
    setFromDate("2025-07-21");
    setFromTime("13:30");
    setToDate("2025-07-21");
    setToTime("14:30");
    setGuests([]);
  };

  const handleCancelClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmYes = () => {
    clearForm();
    setShowConfirm(false);
  };

  const handleConfirmNo = () => {
    setShowConfirm(false);
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center relative">
      <div className="bg-gray-200 rounded-lg p-6 flex justify-center min-h-130 gap-10">
        {/* Left side - Schedule Meeting */}
        <div className="flex-1">
          <h2 className=" text-2xl font-bold text-black-600 mb-5">Schedule Meeting</h2>
          <input
            className=" bg-white border-none rounded px-3 py-2 w-full text-sm mb-5"
            placeholder="Add title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select className=" bg-white border-none rounded px-3 py-2 w-full text-sm mb-5">
            <option value="UTC+05:30">Time zone: (UTC+05:30) India</option>
          </select>
          <textarea
            className=" bg-white border-none rounded p-3 py-2 w-full text-sm h-24 mb-5"
            placeholder="Enter details for this meeting"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <div className="flex items-center gap-2">
              <label className="font-medium">FROM:</label>
              <input
                type="date"
                className=" bg-white border-none rounded px-2 py-1"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <input
                type="time"
                className=" bg-white border-none rounded px-2 py-1"
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
                className=" bg-white border-none rounded px-2 py-1"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button className="border-none bg-blue-600 text-white px-6 py-2 rounded">
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
        <div className="absolute top-0 left-0 w-full h-full bg-green-50 bg-opacity-40 flex items-center justify-center z-50 x">
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-80">
            <p className="text-lg font-medium mb-4">
              Are you sure you want to leave?
            </p>
            <div className=" gap-8 flex justify-center items-center">
              <button
                className="  bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmYes}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={handleConfirmNo}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default schedule;
