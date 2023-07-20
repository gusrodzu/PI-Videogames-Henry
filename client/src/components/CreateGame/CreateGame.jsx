import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenre } from "../../redux/actions/index";
import validate from "./validate";
import loading from "../../assets/XDZT.gif"
import style from "./creategame.module.css";

const CreateGame = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

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
    const { value, checked } = e.target;
    setInput((prevInput) => {
      if (checked) {
        return { ...prevInput, genres: [...prevInput.genres, value] };
      } else {
        return {
          ...prevInput,
          genres: prevInput.genres.filter((genre) => genre !== value),
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(postVideogame(input));
    alert("Personaje creado");

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
      <nav className={style.navbarContainer}>
        <div className={style.navBar}>
          <h1 className={style.title}>Crea tu propio videojuego</h1>
          <Link to="/home" className={style.buttonblack}>
            Regresar
          </Link>
        </div>
      </nav>

      <div className={style.content}>

        <form onSubmit={handleSubmit} className={style.form}>
          {/* nombre */}
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

          {/* imagen */}
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

          {/* platafomra */}
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

          {/* fecha */}
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

          {/* Genero */}
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

          {/* Stock */}
          <div className={style.field}>
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              value={input.stock}
              name="stock"
              onChange={handleChange}
            />

            


          </div>

          {/* Rting */}
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

          {/* Descripcion */}
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
        </form>

        <div className={style.side}>
          <img src={input.image ? input.image : loading} alt={input.name} />
          <div className={style.cardinfo}>
            <h3 className={style.cardname}>Name: {input.name}</h3>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CreateGame;
