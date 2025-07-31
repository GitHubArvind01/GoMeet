import { useState } from "react";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const GuestInput = ({ guests, setGuests }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (isValidEmail(input)) {
        setGuests([...guests, input]);
        setInput("");
      }
    }
  };

  const removeGuest = (index) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-black-600 mb-5">Add Guests</h2>
      <input
        className="bg-white border-none rounded px-3 py-2 w-full text-sm"
        placeholder="Enter name, email or phone number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex flex-wrap mt-3 gap-2">
        {guests.map((email, index) => (
          <div
            key={index}
            className="bg-green-200 text-sm rounded-full px-3 py-1 flex items-center"
          >
            {email}
            <button
              className="ml-2 text-red-500"
              onClick={() => removeGuest(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestInput;
