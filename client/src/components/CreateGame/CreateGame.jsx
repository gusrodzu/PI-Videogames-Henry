// Módulos
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Funciones
import validate from "./validate"; // Importa la función de validación para el formulario

// Acciones 'postVideogame' y 'getGenre'
import { postVideogame, getGenre } from "../../redux/actions/index"; // Importa acciones para el manejo de datos de videojuegos y géneros desde Redux

// Imagenes
import loading from "../../assets/Rectangle 5 copy.png"; // Importa una imagen de carga

// CSS
import style from "./creategame.module.css"; // Importa los estilos CSS del componente

const CreateGame = () => {
  const dispatch = useDispatch(); // Instancia el dispatch de Redux

  useEffect(() => {
    dispatch(getGenre()); // Obtiene los géneros del servidor al cargar el componente
  }, []);
  const genres = useSelector((state) => state.genres); // Obtiene los géneros desde el estado global utilizando el hook useSelector de Redux

  // Estado local del componente
  const [error, setError] = useState({}); // Estado para almacenar mensajes de error de validación
  const [input, setInput] = useState({
    name: "",
    image: "",
    genres: [],
    description: "",
    platforms: "",
    date: "",
    rating: 0,
    stock: 0,
  }); // Estado para almacenar los valores de los campos del formulario

  // Manejador de cambios en los campos del formulario
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  // Manejador de cambios en los checkboxes de género
  const handleCheck = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    } else {
      const update = input.genres.filter((item) => item !== e.target.value);
      setInput({
        ...input,
        genres: update,
      });
    }
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(postVideogame(input)); // Envía los datos del videojuego al servidor mediante la acción postVideogame de Redux
    alert("Video juego creado"); // Muestra una alerta al usuario para indicar que el videojuego ha sido creado
    setInput({
      name: "",
      image: "",
      genres: [],
      description: "",
      platforms: "",
      date: "",
      rating: 0,
    }); // Limpia los campos del formulario después del envío
  };

  // Verifica si el formulario es válido
  const isFormValid =
    input.name.trim() !== "" &&
    input.image.trim() !== "" &&
    input.genres.length > 0 &&
    input.description.trim() !== "" &&
    input.platforms.trim() !== "" &&
    input.date.trim() !== "" &&
    input.rating >= 0;

  return (
    <div className={style.container}>
      <div className={style.content}>
        <form onSubmit={handleSubmit} className={style.form}>
          <h1 className={style.title}>Crea tu propio videojuego</h1>
          <br></br>

          {/* Campo de nombre */}
          <div className={style.field}>
            <label>Nombre:</label>
            <input
              placeholder="Nombre"
              type="text"
              id="name"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
            {error.name && <p className={style.error}>{error.name}</p>}
          </div>

          {/* Campo de imagen */}
          <div className={style.field}>
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              id="image"
              value={input.image}
              name="image"
              placeholder="Insert the link"
              onChange={handleChange}
            />
            {error.image && <p className={style.error}>{error.image}</p>}
          </div>

          {/* Campo de plataformas */}
          <div className={style.field}>
            <label htmlFor="platforms">Platforms:</label>
            <input
              type="text"
              id="platforms"
              value={input.platforms}
              name="platforms"
              onChange={handleChange}
            />
            {error.platforms && (
              <p className={style.error}>{error.platforms}</p>
            )}
          </div>

          {/* Campo de fecha de lanzamiento */}
          <div className={style.field}>
            <label htmlFor="date">Release date:</label>
            <input
              type="date"
              id="date"
              value={input.date}
              name="date"
              onChange={handleChange}
            />
            {error.date && <p className={style.error}>{error.date}</p>}
          </div>

          {/* Checkbox de géneros */}
          <div className={style.field}>
            <label htmlFor="checkbox"></label>
            <p>Selecciona al menos un género.</p>
            <br></br>
            <div className={style.types}>
              {genres.map((genre, i) => {
                return (
                  <label key={i} className={style.type}>
                    <input
                      type="checkbox"
                      value={`${genre.name}`}
                      name={`${genre.name}`}
                      onChange={handleCheck}
                    />
                    {`${genre.name}`}
                  </label>
                );
              })}
            </div>
            {error.genres && <p className={style.error}>{error.genres}</p>}
          </div>

          {/* Campo de rating */}
          <div className={style.field}>
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              value={input.rating}
              name="rating"
              onChange={handleChange}
            />
            {error.rating && <p className={style.error}>{error.rating}</p>}
          </div>

          {/* Campo de descripción */}
          <div className={style.field}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={input.description}
              name="description"
              onChange={handleChange}
              className={style.textarea}
            />
            {error.description && (
              <p className={style.error}>{error.description}</p>
            )}
          </div>

          {/* Botón para enviar el formulario */}
          <button
            type="submit"
            id="submit"
            disabled={!isFormValid}
            className={style.button}
          >
            {isFormValid ? "Crear" : "Crear"}
          </button>

          {/* Enlace para regresar a la página de inicio */}
          <div className={style.navBar}>
            <Link to="/home" className={style.buttonblack}>
              Regresar
            </Link>
          </div>
        </form>

        {/* Vista previa de la información del videojuego */}
        <div className={style.cardhold}>
          <div className={style.cardinfo}>
            <img src={input.image ? input.image : loading} alt={input.name} />
            <h3 className={style.cardname}>Name: {input.name}</h3>
            <h3 className={style.cardname}>Platforms: {input.platforms}</h3>
            <h3 className={style.cardname}>Date: {input.date}</h3>
            <h3 className={style.cardname}>
              Genres: {input.genres.join(", ")}
            </h3>
            <h3 className={style.cardname}>Rating: {input.rating}</h3>
            <br></br>
            <h3 className={style.cardname}>Description: {input.description}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;
