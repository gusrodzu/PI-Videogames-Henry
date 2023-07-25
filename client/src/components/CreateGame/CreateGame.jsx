//Módulos
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Funciones 
import { useDispatch, useSelector } from "react-redux";
import validate from "./validate";

// Acciones 'postVideogame' y 'getGenre'
import { postVideogame, getGenre } from "../../redux/actions/index";

// Imagenes
import loading from "../../assets/Rectangle 5 copy.png";

// CSS 
import style from "./creategame.module.css";

const CreateGame = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenre());
  }, []);
  const genres = useSelector((state) => state.genres);

  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    genres: [],
    description: "",
    platforms: "",
    date: "",
    rating: 0,
    stock: 0,
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(error);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(postVideogame(input));
    alert("Personaje creado");
    console.log("Soy del DISPATCH       ", input);

    setInput({
      name: "",
      image: "",
      genres: [],
      description: "",
      platforms: "",
      date: "",
      rating: 0,
      stock: "",
    });
  };

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

          <div className={style.field}>
            <label htmlFor="checkbox">Genros:</label>
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

          <button
            type="submit"
            id="submit"
            disabled={!isFormValid}
            className={style.button}
          >
            {isFormValid ? "Crear" : "Crear"}
          </button>

          <div className={style.navBar}>
            <Link to="/home" className={style.buttonblack}>
              Regresar
            </Link>
          </div>
        </form>

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