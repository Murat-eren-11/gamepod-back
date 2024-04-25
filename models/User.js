const mongoose = require("mongoose");

const Gameuser = mongoose.model("Gameuser", {
  email: {
    unique: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  avatar: Object,
  token: String,
  hash: String,
  salt: String,
});

module.exports = Gameuser;
