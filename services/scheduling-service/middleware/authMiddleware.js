import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Unauthorized - no token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains { id, email, name }
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
