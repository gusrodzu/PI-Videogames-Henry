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

export const getVideogames = () => {
  return async function (dispatch) {
    let { data } = await axios("http://localhost:3001/videogames");
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: data,
    });
  };
};

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

export const getGenre = () => {
  return async function (dispatch) {
    const { data } = await axios("http://localhost:3001/genres");
    return dispatch({ type: GET_GENRE, payload: data });
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    const { data } = await axios("http://localhost:3001/videogames/" + id);
    return dispatch({
      type: GET_DETAIL,
      payload: data,
    });
  };
};

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

export const filterVideogames = (payload) => {
  return { type: FILTER_BY_GENRE, payload };
};

export const filterOrigin = (payload) => {
  return { type: FILTER_BY_ORIGIN, payload };
};

export const Order = (payload) => {
  return { type: ORDER, payload };
};