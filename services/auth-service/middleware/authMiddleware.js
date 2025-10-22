import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  // Check Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Access denied. Token missing." 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.user = decoded; // store user info in request
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token." 
    });
  }
};

export default userAuth;
