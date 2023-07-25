// Se importa  Axios para realizar solicitudes HTTP.
const axios = require("axios");

// Se importa el paquete "dotenv" para cargar las variables de entorno desde un archivo .env.
require("dotenv").config();

//Se  destructuran las variables de entorno API_KEY y URL_GENRE del objeto process.env.
const { API_KEY, URL_GENRE } = process.env;

// Importa el modelo Genre desde el archivo "../db".
const { Genre } = require("../db");

// Función que obtiene y almacena  la información sobre los géneros los videojuegos desde una API externa.
const getGenre = async (req, res) => {
  try {
    // Realiza una solicitud HTTP GET utilizando Axios a la API externa para obtener información sobre géneros.
    const { data } = await axios(`${URL_GENRE}?key=${API_KEY}`);

    // Mapea los resultados obtenidos para obtener un arreglo de nombres de géneros.
    const genres = data.results.map((genre) => genre.name);

    //Bucle forEach para iterar sobre los nombres de géneros y almacenarlos en la base de datos.
    genres.forEach((e) => {
      Genre.findOrCreate({
        where: { name: e },
      });
    });

    // Obtiene los géneros almacenados en la base de datos.
    const allGenres = await Genre.findAll();

    // Devueve la lista de géneros como una respuesta JSON con código de estado 200.
    return res.status(200).json(allGenres);
  } catch (error) {
    // Si ocurre algún error durante el proceso, dmuestra una respuesta de error con el código de estado 404 y un objeto con la propiedad error.
    return res.status(404).json({ error: error.message });
  }
};


module.exports = getGenre;
