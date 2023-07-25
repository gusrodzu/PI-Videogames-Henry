// Importamos la biblioteca Axios para realizar solicitudes HTTP.
const axios = require("axios");

// Importamos el paquete "dotenv" para cargar las variables de entorno desde un archivo .env.
require("dotenv").config();

// Desestructuramos las variables de entorno API_KEY y URL_BASE del objeto process.env.
const { API_KEY, URL_BASE } = process.env;

// Importamos los modelos Videogame y Genre desde el archivo "../db".
const { Videogame, Genre } = require("../db");

// Función que obtiene información de videojuegos desde una API externa.
const getAllVideoGamesByAPI = async (req, res) => {
  try {
    let URL = ``; //Se crea una variable URL con valor vacio

    // Se construye la URL para la solicitud HTTP dependiendo de si se pasa un parámetro req o no.
    if (req) URL = `${URL_BASE}?key=${API_KEY}&page=${req}`;
    if (!req) URL = `${URL_BASE}?key=${API_KEY}`;

    // Realiza una solicitud HTTP GET utilizando Axios a la API externa con la URL construida.
    const { data } = await axios.get(`${URL}`);

    // Verifica si los datos obtenidos son válidos, si no, lanzamos un error.
    if (!data) throw Error();

    // Crea un arreglo vacio para almacenar la información de los videojuegos procesada desde la API.
    const videoGameInfo = [];

    // Se utiliza Promise.all para mapear cada juego obtenido y procesarlo en paralelo.
    await Promise.all(
      data.results.map((game) => {
        // Se crea un objeto con información sobre el videojuego.
        let obj = {
          id: game.id,
          name: game.name,
          rating: game.rating,
          image: game.background_image,
          genres: game.genres.map((genre) => {
            return {
              name: genre.name,
            };
          }),
        };

        // Se agrega el objeto al arreglo videoGameInfo.
        videoGameInfo.push(obj);
      })
    );

    // Devuele la información de los videojuegos desde la API.
    return videoGameInfo;
  } catch (error) {
    // Si ocurre algún error durante el proceso, devuelve un objeto con la propiedad error.
    return { error: error.message };
  }
};

// Función que obtiene la información de los videojuegos desde la base de datos local.
const getAllVideoGamesByDB = async () => {
  try {
    // Realiza una consulta a la base de datos utilizando el modelo Videogame.
    const videoGamesDB = await Videogame.findAll({
      attributes: ["id", "name", "image", "inDB", "rating"],
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

    // Verifica si hay videojuegos en la base de datos.
    // Si hay resultados, devUELVE la información de los videojuegos.
    // Si no hay resultados, devuelve el valor 0.
    if (videoGamesDB.length) return videoGamesDB;
    if (videoGamesDB.length === 0) return 0;

    // Si no se pudo obtener información de la base de datos, se lanza un error.
    if (!videoGamesDB) throw Error();
  } catch (error) {
    // Si ocurre algún error durante el proceso, se lanza un error.
    throw Error();
  }
};

// Combina la información de la API externa y la base de datos local.
const getAllVideoGames = async (req, res) => {
  try {
    // Crea un arreglo para almacenar la información de los videojuegos desde la API externa.
    let apiInfo = [];

    //  Variable para llevar el conteo de la página en la API externa.
    let i = 1;

    // Bucle for que se ejecutará 5 veces para obtener información de 5 páginas en la API.
    for (let index = 0; index < 5; index++) {
      // En la primera iteración (index === 0), se obtiene la información de la API sin especificar una página.
      if (index === 0) {
        let data = await getAllVideoGamesByAPI();
        apiInfo.push(data);
        i++;
      }

      // En las siguientes iteraciones (index !== 0), obtenemos información de la API especificando la página.
      if (index !== 0) {
        let data = await getAllVideoGamesByAPI(i);
        apiInfo.push(data);
        i++;
      }
    }

    // Aplana el arreglo apiInfo para obtener una lista única de objetos de videojuegos.
    apiInfo = apiInfo.flat();

    // Obtiene la información de  los videojuegos desde la base de datos local.
    const dbInfo = await getAllVideoGamesByDB();

    // Combinamos la información de la API externa y la base de datos local.
    // Si no hay videojuegos en la base de datos (dbInfo === 0), devolvemos la información obtenida de la API.
    // Si no se pudo obtener información de la base de datos o ocurrió algún otro error, lanzamos un error.
    const allInfo = apiInfo.concat(dbInfo);
    return res.status(200).json(allInfo);
  } catch (error) {
    // Si ocurre algún error durante el proceso, devuelve una respuesta de error con el código de estado 404 y un objeto con la propiedad error.
    return res.status(404).json({ error: error.message });
  }
};

module.exports = getAllVideoGames;
