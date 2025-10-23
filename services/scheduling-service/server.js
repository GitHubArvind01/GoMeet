import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import meetingRoutes from "./routes/meetingRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/meeting", meetingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Meeting service running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection failed:", err));
