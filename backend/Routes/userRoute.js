//Importing the required libraries
const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
//Destructuring all the module getallproduct
const {
  createUser,
  getallUsers,
  loginUser,
  LogoutUser,
} = require("../Controllers/userController");

router.route("/User/Register").post(createUser);
router.route("/User/Registered").get(getallUsers);
router.route("/User/loginUser").post(loginUser);
router.route("/User/logout").get(LogoutUser);

module.exports = router;
