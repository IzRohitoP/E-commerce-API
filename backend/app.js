//Importing library for this file
const express = require("express");
const errorhandlermw = require("./middlewares/error");
const cookieparser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieparser());

//importing route
const product = require("./Routes/productRoute");
const user = require("./Routes/userRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);

//Adding middlewares for error handling
app.use(errorhandlermw);

//testing purpose
app.get("/", (req, res) => {
  res.send("Welcome server is Started");
});

module.exports = app;
