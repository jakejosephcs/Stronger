const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "user",
  }
);

const model = mongoose.Model("UserSchema", UserSchema);

module.exports = model;
