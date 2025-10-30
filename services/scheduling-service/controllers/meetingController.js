// import Meeting from "../models/Meeting.js";

// export const createMeeting = async (req, res) => {
//   try {
//     const { title, details, fromDate, fromTime, toDate, toTime, guests } = req.body;

//     if (!title || !fromDate || !fromTime || !toDate || !toTime) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const newMeeting = new Meeting({
//       title,
//       details,
//       startTime: `${fromDate}T${fromTime}`,
//       endTime: `${toDate}T${toTime}`,
//       guests,
//     });

//     await newMeeting.save();
//     res.status(201).json({ message: "Meeting scheduled successfully", meeting: newMeeting });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };



import Meeting from "../models/Meeting.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export const createMeeting = async (req, res) => {
  try {
    const { title, details, fromDate, fromTime, toDate, toTime, guests } = req.body;

    // generate unique meeting id
    const meetingId = uuidv4();
    const joinLink = `https://gomeet.com/join/${meetingId}`;

    const newMeeting = new Meeting({
      title,
      details,
      startTime: `${fromDate}T${fromTime}`,
      endTime: `${toDate}T${toTime}`,
      guests,
      meetingId,
      joinLink,
    });

    await newMeeting.save();

    // send email to guests
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // or your SMTP server
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (const guest of guests) {
      await transporter.sendMail({
        from: `"GoMeet" <${process.env.EMAIL_USER}>`,
        to: guest,
        subject: `Meeting Scheduled: ${title}`,
        html: `
          <p>Hi ${guest},</p>
          <p>Your meeting <b>${title}</b> has been scheduled.</p>
          <p><b>Start:</b> ${fromDate} ${fromTime}</p>
          <p><b>End:</b> ${toDate} ${toTime}</p>
          <p>Details: ${details}</p>
          <p>Join Meeting: <a href="${joinLink}" target="_blank">Click Here</a></p>
        `,
      });
    }

    res.status(201).json({ message: "Meeting scheduled successfully", meeting: newMeeting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
