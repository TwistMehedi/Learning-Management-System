import jwt from "jsonwebtoken";
import TryCatch from "./../utils/TryCatch.js"
import { ErrorHandler } from "../utils/ErrorHandler.js";
import User from "../models/user.model.js";


export const isAuthenticated = TryCatch(async (req, res, next) => {
   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
   if (!token) next(new ErrorHandler("You are unathorized", 401));
  
  // if (!token) next(new ErrorHandler("Token is required", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
   
});

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ message: "User role missing in request" });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: `Access denied for role '${userRole}'. Allowed roles: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};

