const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const gamesRoute = require("./routes/games");
app.use(gamesRoute);

const developersRoute = require("./routes/developers");
app.use(developersRoute);

const genresRoute = require("./routes/genres");
app.use(genresRoute);

const platformsRoute = require("./routes/platforms");
app.use(platformsRoute);

const publishersRoute = require("./routes/publishers");
app.use(publishersRoute);

const tagsRoute = require("./routes/tags");
app.use(tagsRoute);

const userRoute = require("./routes/user");
app.use(userRoute);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Y'a pas de jeux ici !",
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Le serveur démarreeeeeeeeeeeeeeeeeeeeeeeeee sur le port ${process.env.PORT}`
  );
});
