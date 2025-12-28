const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");

const User = require("./models/user");

const errorHandler = require("./middleware/error-handler");
const { requestLogger, errorLogger } = require("./middleware/logger");

const { PORT = 3001 } = process.env;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Request Logger
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Routes
app.use("/", mainRouter);

// After Route Logger
app.use(errorLogger);

// Celebrate error handler
app.use(errors());

// Error handler
app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => User.init())
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      // console.log(`App running on port ${PORT}`);
    });
  })

  .catch((err) => {
    console.error("Startup error:", err);
  });
