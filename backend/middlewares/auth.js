const catchAsyncError = require("../middlewares/catchAsyncerror");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  //   console.log(req)
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please  login to access this resource", 401));
  }
  // console.log(token);
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  // console.log(decode);
  req.user = await User.findById(decode.id);
  next();
});

exports.AuthorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
