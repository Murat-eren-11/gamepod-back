const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();
const axios = require("axios");

const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(500).json({ message: "Email already exists" });
    }
    if (!req.body.username) {
      return res.status(300).json({ message: "Username required" });
    }

    const salt = uid2(16);
    const hash = SHA256(req.body.password + salt).toString(encBase64);
    const token = uid2(64);

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      token: token,
      hash: hash,
      salt: salt,
    });

    await newUser.save();

    res.cookie("game-token", newUser.token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json("Compte créé avec succès " + newUser.username);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const hash = SHA256(req.body.password + userFound.salt).toString(encBase64);
    if (hash !== userFound.hash) {
      return res
        .status(401)
        .json({ message: "Password incorrect or Mail incorrect" });
    }
    res.status(200).json({
      message: "Connecté",
      username: userFound.username,
      token: userFound.token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
