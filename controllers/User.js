import asyncErrorHandler from "../middlewares/asyncErrorHandler.js";
import Registration_Id from "../models/Registration_Id.js";
import User from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createNewUser = asyncErrorHandler(async (req, res, next) => {
  const id = await Registration_Id.findOne({ Reg_Id: req.body.Reg_Id });

  if (!id) {
    return next(new ErrorHandler(404, "Invalid Registration Id"));
  }

  const body = { ...req.body, student_id: id._id };


  const user = await User.create(body);

  res.status(200).json({
    success: true,
    message: "User Created SuccessFully",
    user,
  });
});
