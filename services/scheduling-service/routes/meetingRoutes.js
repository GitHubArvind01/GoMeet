import express from "express";
import { createMeeting } from "../controllers/meetingController.js";

const router = express.Router();

router.post("/schedule", createMeeting);

export default router;
