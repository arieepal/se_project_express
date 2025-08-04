const { getUsers, createUser, getUser } = require("../controllers/users");
const router = require("express").Router();

router.get("/:userId", getUser);
router.get("/", getUsers);

router.post("/", createUser);

module.exports = router;
