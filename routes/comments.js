const express = require("express");
const router = express.Router();

const Comment = require("../models/Comments");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/comments/:id", isAuthenticated, async (req, res) => {
  try {
    const newComment = new Comment({
      id: req.params.id,
      user: req.user,
      text: req.body.text,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    const comments = await Comment.find({id: req.params.id}).populate(
      "user",
      "username"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
