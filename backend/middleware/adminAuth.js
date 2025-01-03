import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const {token} = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id.isAdmin) {
      return res.status(401).json({ success: false, message: "Not authorized to access this route" });
    }
    // req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Token is not valid" });
  }
};

export default adminAuth;