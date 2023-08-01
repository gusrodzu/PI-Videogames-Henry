const axios = require("axios");
require("dotenv").config();
const { API_KEY, URL_GENRE } = process.env;
const { Videogame, Genre } = require("../db");

const postVideoGames = async (req, res) => {
  try {
    const {
      name,
      description,
      platforms,
      image,
      date,
      rating,
      genres,
      inDB,
      stock,
    } = req.body;

    let videojuego = await Videogame.create({
      name,
      description,
      platforms,
      image,
      date,
      stock,
      rating,
      inDB,
    });


    for (let i = 0; i < genres.length; i++) {
      let genreDb = await Genre.findAll({
        where: { name: genres[i] },
      });
      videojuego.addGenre(genreDb);

    }

    res
      .status(200)
      .json({ message: `Videojuego creado con éxito`, videogame: videojuego });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el videojuego" });
  }
};

module.exports = postVideoGames;