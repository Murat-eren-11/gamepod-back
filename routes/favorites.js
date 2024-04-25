const express = require("express");
const router = express.Router();

const Gameuser = require("../models/User");
const Collection = require("../models/Collection");
const Todo = require("../models/Todo");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/collection/collection", isAuthenticated, async (req, res) => {
  try {
    const existInCollection = await Collection.findOne({
      id: req.body.id,
      owner: req.user,
    });
    if (existInCollection) {
      return res.status(400).json("Déjà ajouté");
    }
    const newCollection = new Collection({
      id: req.body.id,
      owner: req.user,
    });
    await newCollection.save();
    res.status(200).json("Added in collection");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/collection/collection", isAuthenticated, async (req, res) => {
  try {
    const user = await Gameuser.findOne({ token: req.user.token });
    const gameCollection = await Collection.find({
      owner: user._id,
    }).populate("owner", "token");
    res.json(gameCollection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(
  "/collection/collection/:id",
  isAuthenticated,
  async (req, res) => {
    try {
      const result = await Collection.findOneAndDelete({
        id: req.params.id,
        owner: req.user._id,
      });

      if (!result) {
        return res
          .status(404)
          .json({ message: "Item not found or not owned by user" });
      }

      res.json({ message: "Removed from collection" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.post("/collection/todo", isAuthenticated, async (req, res) => {
  try {
    const existInTodo = await Todo.findOne({
      id: req.body.id,
      owner: req.user,
    });
    if (existInTodo) {
      return res.status(400).json("Déjà ajouté");
    }
    const newTodo = new Todo({
      id: req.body.id,
      owner: req.user,
    });
    await newTodo.save();
    res.status(200).json("Added in todolist");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/collection/todo", isAuthenticated, async (req, res) => {
  try {
    const user = await Gameuser.findOne({ token: req.user.token });
    const gameTodo = await Todo.find({
      owner: user._id,
    }).populate("owner", "token");
    res.json(gameTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/collection/todo/:id", isAuthenticated, async (req, res) => {
  try {
    const result = await Todo.findOneAndDelete({
      id: req.params.id,
      owner: req.user._id,
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: "Item not found or not owned by user" });
    }

    res.json({ message: "Removed from todo list" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
