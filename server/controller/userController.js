const User = require("../models/User");

// @desc Get all users
// @route GET /users
// @access Public
const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc Get user based on id
// @route GET /users/:id
// @access Public
const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getUsers,
  getUser,
};
