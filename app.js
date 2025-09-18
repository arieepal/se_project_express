const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");

const User = require("./models/user");

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", mainRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => User.init())
  .then(() => {
    app.listen(PORT);
  })

  .catch((err) => {
    console.error("Startup error:", err);
  });
