const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const cors = require("cors");
const User = require("./models/user");
const { NOT_FOUND } = require("./utils/errors");

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", mainRouter);

// app.use((req, res) => {
//   res.status(NOT_FOUND).json({ error: "Not Found" });
// });

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connect to DB");
    return User.init();
  })
  .then(() => {
    console.log("User indexes ensured");

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })

  .catch((err) => {
    console.error("Startup error:", err);
  });
