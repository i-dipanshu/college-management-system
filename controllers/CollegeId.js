import ErrorHandler from "../utils/ErrorHandler.js";

import CollegeId from "../models/admin/CollegeId.js";

import handleAsyncError from "../middlewares/asyncErrorHandler.js";
import asyncErrorHandler from "../middlewares/asyncErrorHandler.js";

/* -------------------------------------------------------------------------------- */

export const createNewRegID = handleAsyncError(async (req, res, next) => {
  const collegeId = await CollegeId.create(req.body);

  res.status(200).json({
    success: true,
    message: "SuccessFully created a new registration Id",
    collegeId,
  });
});

/* -------------------------------------------------------------------------------- */

export const deleteRegId = asyncErrorHandler(async (req, res, next) => {
  const id = await CollegeId.findOne(req.body);

  if (!id) {
    return next(new ErrorHandler(404, "College Id not found"));
  }

  await id.remove();

  res.status(200).json({
    success: true,
    message: "SuccessFully Deleted.",
  });
});
