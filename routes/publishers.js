const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/publishers", async (req, res) => {
  try {
    const { page, page_size } = req.query;

    const response = await axios.get(
      `https://api.rawg.io/api/publishers?key=${process.env.API_KEY}`,
      { params: { page, page_size } }
    );

    const publishers = response.data;

    res.status(200).json(publishers);
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

router.get("/publisher/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/publishers/${id}?key=${process.env.API_KEY}`
    );
    const publisher = response.data;
    res.status(200).json(publisher);
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
