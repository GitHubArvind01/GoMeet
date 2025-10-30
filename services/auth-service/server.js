import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import userAuth from "./middleware/authMiddleware.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/dashboard", userAuth, (req, res) => {
  res.json({ 
    message: "Welcome to your dashboard!", 
    user: req.user // contains id and email from token
  });
});

// API Endpoints
app.get("/", (req, res) => res.send("Welcome @llu"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
