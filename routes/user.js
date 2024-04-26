const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const Gameuser = require("../models/User");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

router.post("/signup", async (req, res) => {
  try {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({message: "All fields including a picture are required"});
    }

    const userExists = await Gameuser.findOne({email});
    if (userExists) {
      return res.status(409).json({message: "Email already exists"});
    }

    const picture = req.files.picture;
    const avatarResult = await cloudinary.uploader.upload(
      picture.tempFilePath,
      {
        folder: "gamepad/avatar",
      }
    );

    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(64);

    const newUser = new Gameuser({
      email,
      username,
      avatar: avatarResult.secure_url,
      token,
      hash,
      salt,
    });

    await newUser.save();

    res.cookie("game-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(201).json({
      message: "Compte créé avec succès",
      username: newUser.username,
      avatar: newUser.avatar,
      token: newUser.token,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.post("/login", async (req, res) => {
  try {
    const userFound = await Gameuser.findOne({email: req.body.email});

    if (!userFound) {
      return res.status(404).json({message: "User not found"});
    }

    const hash = SHA256(req.body.password + userFound.salt).toString(encBase64);
    if (hash !== userFound.hash) {
      return res
        .status(401)
        .json({message: "Password incorrect or Mail incorrect"});
    }
    res.status(200).json({
      message: "Connecté",
      username: userFound.username,
      token: userFound.token,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.get("/gameuser", isAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({message: "Unauthorized"});
    }

    const user = await Gameuser.findById(req.user._id);

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    res.status(200).json({
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.put("/update", isAuthenticated, async (req, res) => {
  try {
    const user = await Gameuser.findById(req.user._id);

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    if (req.body.username) {
      user.username = req.body.username;
    }

    if (req.body.email) {
      const emailExists = await Gameuser.findOne({email: req.body.email});
      if (emailExists && emailExists._id.toString() !== user._id.toString()) {
        return res.status(400).json({message: "Email already in use"});
      }
      user.email = req.body.email;
    }

    if (req.body.password) {
      const salt = user.salt;
      const hash = SHA256(req.body.password + salt).toString(encBase64);
      user.hash = hash;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      data: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
