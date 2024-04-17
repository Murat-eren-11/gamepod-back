const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/developers", async (req, res) => {
  try {
    const { page, page_size } = req.query;

    const response = await axios.get(
      `https://api.rawg.io/api/developers?key=${process.env.API_KEY}`,
      { params: { page, page_size } }
    );

    const developers = response.data;

    res.status(200).json(developers);
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

router.get("/developers/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/developers/${id}?key=${process.env.API_KEY}`
    );
    const developer = response.data;
    res.status(200).json(developer);
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
