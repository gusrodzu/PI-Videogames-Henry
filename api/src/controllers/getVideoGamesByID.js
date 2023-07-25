// Importa la biblioteca Axios para realizar solicitudes HTTP.
const axios = require("axios");

// Importa el paquete "dotenv" para cargar las variables de entorno desde un archivo .env.
require("dotenv").config();

// Desestructuramos las variables de entorno API_KEY y URL_BASE del objeto process.env.
const { API_KEY, URL_BASE } = process.env;

// Importa los modelos Videogame y Genre desde el archivo "../db".
const { Videogame, Genre } = require("../db");

// Importa el operador "Op" de Sequelize, que se utiliza para hacer consultas más complejas.
const { Op } = require("sequelize");

// Función que busca un videojuego por su ID en la base de datos local o en la API externa.
const getVideogamesByID = async (req, res) => {
  try {
    // Obtiene el ID del videojuego desde los parámetros de la solicitud.
    const { id } = req.params;

    // Comprueba si el ID es un número o no.
    if (isNaN(id)) {
      // Si el ID no es un número, busca el videojuego en la base de datos local.
      const gameByIdDb = await Videogame.findOne({
        where: {
          id,
        },
        attributes: [
          "id",
          "name",
          "image",
          "description",
          "platforms",
          "date",
          "stock",
          "rating",
        ],
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      // Verifica si se encontró el videojuego en la base de datos.
      if (gameByIdDb) {
        // Si se encontró, devuelve la información del videojuego como una respuesta JSON con código de estado 200.
        return res.status(200).json(gameByIdDb);
      } else {
        // Si no se encontró el videojuego en la base de datos, devuelve una respuesta de error con código de estado 404 y un mensaje indicando que no se encontró el videojuego.
        return res.status(404).json({
          error: `No se encontró ningún personaje con el ID: ${id} en la base de datos.`,
        });
      }
    } else {
      // Si el ID es un número, busca el videojuego en la API externa.
      let { data } = await axios(`${URL_BASE}/${id}?key=${API_KEY}`);

      // Crea un objeto con la información del videojuego obtenida desde la API externa.
      let response = {
        id: data.id,
        name: data.name,
        image: data.background_image,
        description: data.description,
        platforms: data.parent_platforms.map((plat) => plat.platform.name),
        date: data.released,
        rating: data.rating,
        genres: data.genres.map((genre) => genre.name),
      };

      // Verifica si se encontró el videojuego en la API externa.
      if (response) {
        // Si se encontró, devolvemos la información del videojuego como una respuesta JSON con código de estado 200.
        return res.status(200).json(response);
      } else {
        // Si no se encontró el videojuego en la API externa, devuelve una respuesta de error con código de estado 404 y un mensaje indicando que no se encontró el videojuego.
        return res.status(404).json({
          error: `No se encontró ningún Videojuego con el ID: ${id} en la API externa.`,
        });
      }
    }
  } catch (error) {
    // Si ocurre algún error durante el proceso, devuelve una respuesta de error con código de estado 404 y un objeto con la propiedad error.
    res.status(404).json({ error: error.message });
  }
};


module.exports = getVideogamesByID;
