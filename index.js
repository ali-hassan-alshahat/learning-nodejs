const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const coursesRouter = require("./routes/courses.routes");
const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");
const cors = require("cors");
const usersRouter = require("./routes/users.routes.js");
const path = require("path");
/* Here in the uri we put the database name in it after the mongodb.net/*/
const uri = process.env.MONGO_URL;
mongoose.connect(uri).then(() => console.log("Mongoose Server Started"));

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Global error handler middleware
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});
// Global middleware for not found routes
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "This resource is not available",
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Listening in port 4000");
});
