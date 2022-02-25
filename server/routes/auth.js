const router = require("express").Router();
const { createUser, loginUser } = require("../controller/authController");

// Signing a user up
router.post("/signup", createUser);

// Logging in a user
router.post("/login", loginUser);

module.exports = router;
