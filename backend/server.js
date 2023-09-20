const app = require("./app");
const dbconnect = require("./config/database");
require("dotenv").config();

//Handling uncaught exception
process.on("unCaughtError", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Sutting down due to the server unCaughtError");
  server.close(() => {
    process.exit(1);
  });
});

const PORT = process.env.PORT || 4000;

//Calling database connection function
dbconnect();

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Sutting down due to the server unhandled rejection error");
  server.close(() => {
    process.exit(1);
  });
});
