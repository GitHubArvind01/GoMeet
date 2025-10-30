import Meeting from "../models/Meeting.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

const generatePasscode = (length = 12) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


export const createMeeting = async (req, res) => {
  try {
    const { title, details, fromDate, fromTime, toDate, toTime, guests } = req.body;

    // here unique meeting ID
    const meetingId = uuidv4();

    // here the 12-digit passcode
    const passcode = generatePasscode(12);
    const joinLink = `${process.env.BASE_URL}/JoinMeet`;


    const newMeeting = new Meeting({
      title,
      details,
      startTime: `${fromDate}T${fromTime}`,
      endTime: `${toDate}T${toTime}`,
      guests,
      meetingId,
      passcode,
      joinLink,
    });

    await newMeeting.save();

    // sending email to guests
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
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
          <div style="
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8f9fb;
            padding: 40px 0;
            color: #1f2937;
          ">
            <div style="
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 16px;
              box-shadow: 0 4px 14px rgba(0,0,0,0.05);
              overflow: hidden;
              border: 1px solid #e5e7eb;
            ">

              <!-- Header -->
              <div style="padding: 22px 30px; border-bottom: 1px solid #e5e7eb; text-align: center;">
                <h2 style="margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.3px;">GoMeet Invitation</h2>
              </div>

              <!-- Body -->
              <div style="padding: 30px;">
                <p style="margin: 0 0 10px;">Hi</p>
                <p style="margin: 0 0 25px;">Your meeting has been successfully scheduled.</p>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Start</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 500;">${fromDate} at ${fromTime}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">End</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 500;">${toDate} at ${toTime}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Meeting ID</td>
                    <td style="padding: 8px 0; text-align: right; color: #2563eb; font-weight: 600;">${newMeeting.meetingId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Passcode</td>
                    <td style="padding: 8px 0; text-align: right; color: #dc2626; font-weight: 600;">${passcode}</td>
                  </tr>
                </table>

                ${
                  details
                    ? `<p style="margin: 20px 0; color: #374151;"><strong>Details:</strong> ${details}</p>`
                    : ""
                }

                <!-- Join Button -->
                <div style="text-align: center; margin: 35px 0;">
                  <a href="${joinLink}" target="_blank" style="
                    display: inline-block;
                    background-color: #2563eb;
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    padding: 12px 32px;
                    border-radius: 10px;
                    font-size: 15px;
                    letter-spacing: 0.3px;
                    box-shadow: 0 3px 8px rgba(37,99,235,0.25);
                    transition: background 0.3s ease;
                  ">
                    Join Meeting
                  </a>
                </div>
              </div>

              <!-- Footer -->
              <div style="
                background-color: #f9fafb;
                padding: 15px 20px;
                text-align: center;
                font-size: 12px;
                color: #9ca3af;
                border-top: 1px solid #e5e7eb;
              ">
                This email was sent by <strong>GoMeet</strong>. Please contact the organizer for any changes.
              </div>
            </div>
          </div>
        `,
      });
    }

    res.status(201).json({ message: "Meeting scheduled successfully", meeting: newMeeting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

