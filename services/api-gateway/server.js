import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Proxy routes
app.use("/meeting", createProxyMiddleware({
  target: process.env.MEETING_SERVICE,
  changeOrigin: true
}));

app.use("/auth", createProxyMiddleware({
  target: process.env.AUTH_SERVICE,
  changeOrigin: true
}));

app.use("/room", createProxyMiddleware({
  target: process.env.ROOM_SERVICE,
  changeOrigin: true
}));

app.listen(process.env.PORT, () => {
  console.log(`🚀 API Gateway running on port ${process.env.PORT}`);
});
