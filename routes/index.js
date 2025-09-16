const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");
const clothingItem = require("./clothingItem");
const userRouter = require("./users");

const { login, createUser } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res) => res.status(NOT_FOUND).send({ message: "Not found" }));

module.exports = router;
