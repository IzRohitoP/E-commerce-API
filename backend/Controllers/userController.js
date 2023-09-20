const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middlewares/catchAsyncerror");
const User = require("../Models/user");
const sendToken = require("../utils/jwttokens");
//Create User or Register User

exports.createUser = catchAsyncError(async (req, res, next) => {
  const user = await User.create(req.body);
  sendToken(user, 201, res);
});

//Get all users

exports.getallUsers = catchAsyncError(async (req, res, next) => {
  const user = await User.find();
  res.status(201).json({
    success: true,
    message: "All users fetched",
    data: user,
  });
});

//Login user

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, req.body);
  if (!email || !password) {
    return next(new ErrorHandler("Please enter the email and password ", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Ivalid Email and password", 404));
  }
  const passwordMatched = user.comparePassword(password);
  if (!passwordMatched) {
    return next(new ErrorHandler("Please enter the correct password", 404));
  }

  const token = user.getJwtToken();

  sendToken(user, 200, res);
});

//Logout user
exports.LogoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
});
