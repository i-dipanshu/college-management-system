export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongodb _id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(400, message);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(400, message);
  }

  // Wrong JWT Error
  if (err.code === "JsonWebTokenError") {
    const message = "Json Web Token is invalid, Try again";
    err = new ErrorHandler(400, message);
  }

  // Expired JWT Error
  if (err.code === "TokenExpiredError") {
    const message = "Json Web Token is expired, Try again";
    err = new ErrorHandler(400, message);
  }

  // response
  res.status(err.statusCode).json({
    success: false,
    // err: err.message
    message: err.message,
  });
};
