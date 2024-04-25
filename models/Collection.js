const mongoose = require("mongoose");

const Collection = mongoose.model("Collection", {
  id: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gameuser",
  },
});

module.exports = Collection;
