// Importa la biblioteca Axios para realizar solicitudes HTTP.
const axios = require("axios");

// Importa el paquete "dotenv" para cargar las variables de entorno desde un archivo .env.
require("dotenv").config();

// Desetructura las variables de entorno API_KEY y URL_GENRE del objeto process.env.
const { API_KEY, URL_GENRE } = process.env;

// Importa los modelos Videogame y Genre desde el archivo "../db".
const { Videogame, Genre } = require("../db");

// Función que crea un nuevo videojuego y lo asocia a uno o varios géneros en la base de datos local.
const postVideoGames = async (req, res) => {
  try {
    // Obtiene los datos del videojuego desde el cuerpo (body) de la solicitud.
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

    // Crea un nuevo videojuego en la base de datos local utilizando el modelo Videogame.
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

    // Recorre el arreglo de géneros proporcionado en la solicitud.
    for (let i = 0; i < genres.length; i++) {
      // Buscamos el género en la base de datos local por su nombre.
      let genreDb = await Genre.findAll({
        where: { name: genres[i] },
      });

      // Asocia el género encontrado al nuevo videojuego utilizando el método addGenre proporcionado por Sequelize.
      videojuego.addGenre(genreDb);
    }

    // Dev uelve una respuesta con código de estado 200 y un mensaje indicando que el videojuego se ha creado con éxito, junto con la información del videojuego creado.
    res.status(200).json({
      message: `Videojuego creado con éxito`,
      videogame: videojuego,
    });
  } catch (error) {
    // Si ocurre algún error durante el proceso, devuelve una respuesta de error con código de estado 500 y un mensaje indicando que ha ocurrido un error al crear el videojuego.
    console.log(error);
    res.status(500).json({ error: "Error al crear el videojuego" });
  }
};


module.exports = postVideoGames;
