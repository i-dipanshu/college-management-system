import asyncErrorHandler from "../middlewares/asyncErrorHandler.js";
import CollegeId from "../models/admin/CollegeId.js";
import Student from "../models/admin/Students/Student.js";
import User from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import token from "../utils/token.js";

export const createNewUser = asyncErrorHandler(async (req, res, next) => {
  const id = await CollegeId.findOne({ regd: req.body.regd });

  if (!id) {
    return next(new ErrorHandler(404, "Invalid Registration Id"));
  }

  const user = await User.create({ ...req.body, college_id: id._id });

  token(user, 201, res);
});

export const loginUserEmail = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // not found
  if (!email || !password) {
    return next(new ErrorHandler(400, "Invalid Email or Password"));
  }

  // finding user
  const user = await User.findOne({ email }).select("+password");

  // not found
  if (!user) {
    return next(new ErrorHandler(401, "Invalid Email or Password"));
  }

  // compare password
  const isPasswordCorrect = await user.comparePassword(password);

  // not matched
  if (!isPasswordCorrect) {
    return next(new ErrorHandler(401, "Invalid Email or Password."));
  }

  token(user, 200, res);
});

export const loginUserUserName = asyncErrorHandler(async (req, res, next) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return next(new ErrorHandler(400, "Invalid username or password"));
  }

  const user = await User.findOne({ userName }).select("+password");

  if (!user) {
    return next(new ErrorHandler(400, "Invalid username or password"));
  }

  const isPasswordCorrect = user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new ErrorHandler(400, "Invalid username or password"));
  }

  token(user, 200, res);
});

export const loginUserRegd = asyncErrorHandler(async (req, res, next) => {
  const { regd, password } = req.body;

  if (!regd || !password) {
    return next(new ErrorHandler(400, "Invalid College Id or password"));
  }

  const user = await User.findOne({ regd }).select("+password");

  if (!user) {
    return next(new ErrorHandler(400, "Invalid College Id or password"));
  }

  const isPasswordCorrect = user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new ErrorHandler(400, "Invalid College Id or password"));
  }

  token(user, 200, res);
});

// logout
export const logoutUser = asyncErrorHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: false,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});

// get me -- logged in
export const getMe = asyncErrorHandler(async (req, res, next) => {
  const user = req.user;

  const { regd } = user;

  const student = await Student.findOne({ regd });

  if (!student) {
    return next(new ErrorHandler(404, "Your are not registered."));
  }

  res.status(200).json({
    success: true,
    user,
    student,
  });
});

// get all user -- logged in
export const getAllUser = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});
