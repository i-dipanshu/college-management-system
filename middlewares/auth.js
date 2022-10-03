import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncErrorHandler from "./asyncErrorHandler.js";

export const isUserAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;

  // not found
  if (!token) {
    return next(new ErrorHandler(401, "Please login to access this resource."));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedToken.id);

  next();
});

// verify roles

export const isRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          403,
          `Role: ${req.user.role} can't access this resource`
        )
      );
    }

    // and if role is admin
    next();
  };
};
