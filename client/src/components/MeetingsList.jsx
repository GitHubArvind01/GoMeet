import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_SCHEDULE_BACKEND_URL;

export default function MeetingsList() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/meeting/my-meetings`, {
          withCredentials: true,
        });

        if (data.success) {
          setMeetings(data.meetings);
        } else {
          setError("Failed to fetch meetings");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching meetings");
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (loading) return <p className="text-gray-500">Loading meetings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Meetings</h3>

      {meetings.length === 0 ? (
        <p className="text-gray-500 italic">No meetings scheduled yet.</p>
      ) : (
        <div className="space-y-3">
          {meetings.map((m) => (
            <div
              key={m._id}
              className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <h4 className="text-lg font-semibold text-indigo-700">{m.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{m.details}</p>
              <div className="text-sm text-gray-500 mt-2">
                🕓 {m.startTime} - {m.endTime}
              </div>
              <a
                href={m.joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-indigo-600 font-medium hover:underline"
              >
                Join Meeting →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
