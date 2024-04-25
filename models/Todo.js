const mongoose = require("mongoose");

const Todo = mongoose.model("Todo", {
  id: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gameuser",
  },
});

module.exports = Todo;
