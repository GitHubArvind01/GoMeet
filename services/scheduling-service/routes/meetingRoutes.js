import express from "express";
import { createMeeting, getUserMeetings } from "../controllers/meetingController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/schedule", verifyUser, createMeeting);
router.get("/my-meetings", verifyUser, getUserMeetings);

export default router;
