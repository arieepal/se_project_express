const router = require("express").Router();
const {
  login,
  createUser,
  getCurrentUser,
  updateProfile,
} = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/login", login);
router.post("/register", createUser);

router.get("/me", auth, getCurrentUser);

router.patch("/me", auth, updateProfile);

module.exports = router;
