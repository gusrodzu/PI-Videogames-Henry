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

// Busca videojuegos por su nombre en la base de datos local o en la API externa.
const getVideogamesByName = async (req, res, next) => {
  // Obtiene el nombre del videojuego desde los parámetros de la solicitud.
  const { name } = req.query;

  try {
    // Busca el videojuegos con el nombre que contenga el valor de 'name' en la base de datos local.
    let gameByNameDb = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: ["id", "name", "image", "inDB"],
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

    // Realiza una solicitud HTTP GET a la API externa para buscar videojuegos por el nombre.
    let gameByNameApi = await axios(
      `${URL_BASE}?key=${API_KEY}&search=${name}`
    );

    // Crea un arreglo 'response' que contiene la información combinada de los videojuegos encontrados en la base de datos local y en la API externa.
    let response = [
      ...gameByNameDb,
      ...gameByNameApi.data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          image: game.background_image,
          genres: game.genres.map((genre) => {
            return {
              name: genre.name,
            };
          }),
        };
      }),
    ].slice(0, 15);

    // Si no se encuentran coincidencias en los videojuegos
    const noContent = `No hay coincidencias al name: '${name}'`;

    // Verifica si se encontraron videojuegos con el nombre buscado.
    if (response.length) {
      // Si se encontraron, devuelve la información de los videojuegos como una respuesta JSON con código de estado 200.
      return res.status(200).json(response);
    } else {
      // Si no se encontraron coincidencias, devuelve una respuesta de error con código de estado 404 y un mensaje indicando que no se encontraron videojuegos con el nombre buscado.
      return res.status(404).json(noContent);
    }
  } catch (error) {
    // Si ocurre algún error durante el proceso, devuelve una respuesta de error con código de estado 404 y un objeto con la propiedad error.
    res.status(404).json({ error: error.message });
  }
};

module.exports = getVideogamesByName;
