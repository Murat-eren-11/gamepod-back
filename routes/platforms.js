const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/platforms", async (req, res) => {
  try {
    const { ordering, page, page_size } = req.query;

    const response = await axios.get(
      `https://api.rawg.io/api/platforms?key=${process.env.API_KEY}`,
      { params: { ordering, page, page_size } }
    );
    const platforms = response.data;
    res.status(200).json(platforms);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response ? error.response.status : 500).json({
        message: "Erreur lors de l'appel API",
        error: error.response ? error.response.data : "Aucune réponse",
      });
    } else if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Erreur interne du serveur", error: error.message });
    } else {
      res.status(500).json({
        message: "Erreur interne du serveur",
        error: "Une erreur inconnue est survenue",
      });
    }
  }
});

router.get("/platforms/lists/parents", async (req, res) => {
  try {
    const { ordering, page, page_size } = req.query;

    const response = await axios.get(
      `https://api.rawg.io/api/platforms/lists/parents?key=${process.env.API_KEY}`,
      { params: { ordering, page, page_size } }
    );
    const parents = response.data;
    res.status(200).json(parents);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response ? error.response.status : 500).json({
        message: "Erreur lors de l'appel API",
        error: error.response ? error.response.data : "Aucune réponse",
      });
    } else if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Erreur interne du serveur", error: error.message });
    } else {
      res.status(500).json({
        message: "Erreur interne du serveur",
        error: "Une erreur inconnue est survenue",
      });
    }
  }
});

router.get("/platform/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/platforms/${id}?key=${process.env.API_KEY}`
    );
    const platform = response.data;
    res.status(200).json(platform);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response ? error.response.status : 500).json({
        message: "Erreur lors de l'appel API",
        error: error.response ? error.response.data : "Aucune réponse",
      });
    } else if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Erreur interne du serveur", error: error.message });
    } else {
      res.status(500).json({
        message: "Erreur interne du serveur",
        error: "Une erreur inconnue est survenue",
      });
    }
  }
});

module.exports = router;
