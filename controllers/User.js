import asyncErrorHandler from "../middlewares/asyncErrorHandler.js";
import CollegeId from "../models/admin/CollegeId.js";
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
  // const { email, password } = req.body;

  // not found
  // if (!email || !password) {
  //   return next(new ErrorHandler(400, "Invalid Email or Password"));
  // }

  // finding user
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  console.log(user);
  // not found
  if (!user) {
    return next(new ErrorHandler(401, "Invalid Email or Password"));
  }

  console.log(user);
  // compare password
  const isPasswordCorrect = await user.comparePassword(req.body.password);

  if (!isPasswordCorrect) {
    return next(new ErrorHandler(401, "Invalid Email or Password."));
  }

  token(user, 200, res);
});

export const getAllUser = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});
