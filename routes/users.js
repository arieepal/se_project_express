const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const auth = require("../middleware/auth");
const { validateUserBody } = require("../middleware/validation");

router.get("/me", auth, getCurrentUser);

router.patch("/me", auth, validateUserBody, updateProfile);

module.exports = router;
