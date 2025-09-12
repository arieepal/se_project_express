const router = require("express").Router();
const { DEFAULT_ERROR } = require("../utils/errors");
const clothingItem = require("./clothingItem");
const userRouter = require("./users");

const { login, createUser } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res) =>
  res.status(DEFAULT_ERROR).send({ message: "route not found" })
);

module.exports = router;
