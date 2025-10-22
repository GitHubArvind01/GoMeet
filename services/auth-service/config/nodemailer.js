import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service:"gmail",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter;