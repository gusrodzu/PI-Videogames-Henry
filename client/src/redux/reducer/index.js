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

let initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload, //
        allVideogames: action.payload,
      };

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

    case GET_GENRE:
      return {
        ...state,
        genres: action.payload,
      };

    case POST_VIDEOGAME:
      return { ...state };

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

    case ORDER:
      let sortedVid = [...state.videogames];
      switch (action.payload) {
        case "All":
          sortedVid = [...state.allVideogames];
          break;
        case "ascAlf":
          sortedVid.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "descAlf":
          sortedVid.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "descRat":
          sortedVid.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
          break;
        case "ascRat":
          sortedVid.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
          break;
        default:
          break;
      }
      return {
        ...state,
        videogames: sortedVid,
      };

    case GET_NAME_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
  
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;