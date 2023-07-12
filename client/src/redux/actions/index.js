import {
  GET_VIDEOGAMES,
  FILTER_BY_GENRE,
  FILTER_BY_ORIGIN,
  ORDER,
  GET_NAME_VIDEOGAMES,
  GET_GENRE,
  GET_DETAIL,
} from "../action-types";
import axios from "axios";



// Solicitud GET para obtener todos los videojuegos
export const getVideogames = () => {
  return async function (dispatch) {
    let { data } = await axios("http://localhost:3001/videogames");
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: data,
    });
  };
};

// Solicitud GET para buscar videojuegos por nombre
export const getNameVideogames = (name) => {
  return async function (dispatch) {
    try {
      let { data } = await axios(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: GET_NAME_VIDEOGAMES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// Solicitud GET para obtener todos los géneros de videojuegos
export const getGenre = () => {
  return async function (dispatch) {
    const { data } = await axios("http://localhost:3001/genres");
    return dispatch({ type: GET_GENRE, payload: data });
  };
};

// Solicitud GET para obtener los detalles de un videojuego específico
export const getDetail = (id) => {
  return async function (dispatch) {
    const { data } = await axios("http://localhost:3001/videogames/" + id);
    return dispatch({
      type: GET_DETAIL,
      payload: data,
    });
  };
};

// Solicitud POST para agregar un nuevo videojuego
export const postVideogame = (payload) => {
  return async function (dispatch) {
    const { data } = await axios.post(
      "http://localhost:3001/videogames",
      payload
    );
    console.log(data);
    return data;
  };
};

// Filtra los videojuegos por género en el almacén Redux
export const filterVideogames = (payload) => {
  return { type: FILTER_BY_GENRE, payload };
};

// Filtra los videojuegos por origen en el almacén Redux
export const filterOrigin = (payload) => {
  return { type: FILTER_BY_ORIGIN, payload };
};

// Ordena los videojuegos en el almacén Redux
export const Order = (payload) => {
  return { type: ORDER, payload };
};
