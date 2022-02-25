const router = require("express").Router();
const { getUser, getUsers } = require("../controller/userController");

// Getting all user's
router.get("/", getUsers);

// Getting a user by id
router.get("/:id", getUser);

module.exports = router;
