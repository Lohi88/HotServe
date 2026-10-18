// middleware/auth.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the header exists and follows Bearer format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token or invalid format" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    req.userId = decoded.id; // Attach userId to request
    next(); // Proceed to controller  y
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
  }
};

export default authMiddleware;
