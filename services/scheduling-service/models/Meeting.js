import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String },
  startTime: { type: String, required: true },
  meetingId: { type: String, required: true },
  joinLink: { type: String, required: true },
  endTime: { type: String, required: true },
  guests: [{ type: String }],
  passcode: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Meeting", meetingSchema);
