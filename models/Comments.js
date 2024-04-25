const mongoose = require("mongoose");

const Comments = new mongoose.model("Comment", {
  id: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gameuser",
  },
  text: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = Comments;
