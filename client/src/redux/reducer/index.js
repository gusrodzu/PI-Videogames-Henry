import {
  GET_VIDEOGAMES,
  FILTER_BY_GENRE,
  FILTER_BY_ORIGIN,
  ORDER,
  GET_NAME_VIDEOGAMES,
  GET_GENRE,
  POST_VIDEOGAME,
  GET_DETAIL,
} from "../action-types";

// Variabeles de estados de la aplicación
let initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: [],
};



// Actualiza el estado con los videojuegos obtenidos y los guarda en 'videogames' y 'allVideogames'
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    // Filtra los videojuegos por género según el payload recibido
    case FILTER_BY_GENRE:
      const filteredgames = state.allVideogames;
      let statusFiltered =
        action.payload === "All"
          ? filteredgames
          : filteredgames.filter((el) =>
              el.genres.some((genero) => genero.name === action.payload)
            );
      return {
        ...state,
        videogames: statusFiltered,
      };

    // Actualiza el estado con los géneros de videojuegos obtenidos
    case GET_GENRE:
      return {
        ...state,
        genres: action.payload,
      };

    // Retorna el estado actual sin realizar cambios
    case POST_VIDEOGAME:
      return { ...state };

    // Filtra los videojuegos por origen según el payload recibido
    case FILTER_BY_ORIGIN:
      const filteredorigin = state.videogames;
      const createdFilter =
        action.payload === "DB"
          ? filteredorigin.filter((el) => el.inDB === true)
          : state.allVideogames.filter((el) => el.inDB !== true);
      return {
        ...state,
        videogames:
          action.payload === "All" ? state.allVideogames : createdFilter,
      };

    // Ordena los videojuegos según el payload recibido
    case ORDER:
      let sortedVid = [...state.videogames];
      switch (action.payload) {
        case "All": //Todos
          sortedVid = [...state.allVideogames];
          break;
        case "ascAlf"://Ascendente Alafabetico
          sortedVid.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "descAlf": //Descendente Alfabetico
          sortedVid.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "descRat": //Descendente Rating
          sortedVid.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
          break;
        case "ascRat": //Ascendente Rating
          sortedVid.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
          break;
        default:
          break;
      }
      return {
        ...state,
        videogames: sortedVid,
      };

 // Actualiza el estado con los videojuegos filtrados por nombre obtenidos
    case GET_NAME_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };

 // Actualiza el estado con los detalles de un videojuego específico obtenidos
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

 // Retorna el estado actual sin realizar cambios
    default:
      return { ...state };
  }
};

export default rootReducer;
