const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Use err.statusCode
  err.message = err.message || "Internal server Error"; // Use err.message

  //MongoDb error problem resolution

  if (err.name === "CastError") {
    const message = `Resource Not Found . Invalid: ${err.message}`;
    err = new ErrorHandler(message, 400);
  }
  //Alocating
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
