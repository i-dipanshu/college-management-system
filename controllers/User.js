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


export const loginUser = asyncErrorHandler( async (req, res, next) => {
  
})