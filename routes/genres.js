const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/genres", async (req, res) => {
  try {
    const { ordering, page, page_size } = req.query;

    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${process.env.API_KEY}`,
      { params: { ordering, page, page_size } }
    );
    const genres = response.data;
    res.status(200).json(genres);
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

router.get("/genres/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres/${id}?key=${process.env.API_KEY}`
    );
    const genre = response.data;
    res.status(200).json(genre);
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
