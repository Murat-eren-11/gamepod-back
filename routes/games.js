const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/games", async (req, res) => {
  try {
    const {
      search,
      search_precise,
      search_exact,
      parent_platforms,
      platforms,
      stores,
      developers,
      publishers,
      genres,
      tags,
      creators,
      dates,
      update,
      platforms_count,
      metacritic,
      exclude_collection,
      exclude_addition,
      exclude_parents,
      exclude_game_series,
      exclude_stores,
      ordering,
      page,
      page_size,
    } = req.query;

    console.log("avant la requête");
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}`,
      {
        params: {
          page,
          page_size,
          search,
          search_precise: search_precise === "false",
          search_exact: search_exact === "true",
          parent_platforms,
          platforms,
          stores,
          developers,
          publishers,
          genres,
          tags,
          creators,
          dates,
          update,
          platforms_count,
          metacritic,
          exclude_collection,
          exclude_addition: exclude_addition === "true",
          exclude_parents: exclude_parents === "true",
          exclude_game_series: exclude_game_series === "true",
          exclude_stores,
          ordering,
        },
      }
    );

    const games = response.data;
    console.log("on a le games");
    res.status(200).json(games);
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

router.get("/game/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`
    );
    const game = response.data;
    res.status(200).json(game);
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

router.get("/game/:id/achievements", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}/achievements?key=${process.env.API_KEY}`
    );
    const gameAchievements = response.data;
    res.status(200).json(gameAchievements);
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

router.get("/game/:id/reddit", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}/reddit?key=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response ? error.response.status : 500).json({
        message: "erreur lors de l'appel API",
        error: error.response ? error.response.data : "Aucun réponse",
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
