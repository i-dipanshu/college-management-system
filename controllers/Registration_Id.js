import ErrorHandler from "../utils/ErrorHandler.js";

import Registration_Id from "../models/Registration_Id.js";

import handleAsyncError from "../middlewares/asyncErrorHandler.js";
import asyncErrorHandler from "../middlewares/asyncErrorHandler.js";

/* -------------------------------------------------------------------------------- */

export const createNewRegID = handleAsyncError(async (req, res, next) => {
  const id = await Registration_Id.findOne(req.body);

  if (id) {
    return next(
      new ErrorHandler(
        400,
        "This Registration id already exists in the database."
      )
    );
  }

  const reg_id = await Registration_Id.create(req.body);

  res.status(200).json({
    success: true,
    message: "SuccessFully created a new registration Id",
    reg_id,
  });
});

/* -------------------------------------------------------------------------------- */

export const deleteRegId = asyncErrorHandler(async (req, res, next) => {
  const id = await Registration_Id.findOne(req.body);

  if (!id) {
    return next(new ErrorHandler(404, "Registration id not found"));
  }

  await id.remove();

  res.status(200).json({
    success: true,
    message: "SuccessFully Deleted.",
  });
});
