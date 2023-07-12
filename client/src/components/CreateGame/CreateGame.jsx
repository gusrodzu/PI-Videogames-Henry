import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postVideogame, getGenre } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import validate from "./validate";
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

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
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
    <div className={style.all}>

     

      <div className={style.body}>
        <div>

          <form onSubmit={handleSubmit} className={style.info}>
            <div className={style.div}>
              <label htmlFor="">Nombre:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
              />
              {error.name && <p>{error.name}</p>}
            </div>
            <div className={style.div}>
              <label htmlFor="">Imagen:</label>
              <input
                type="text"
                value={input.image}
                name="image"
                placeholder="Inserta el enlace"
                onChange={handleChange}
              />
              {error.image && <p>{error.image}</p>}
            </div>

            <div className={style.div}>
              <label htmlFor="">Plataformas:</label>
              <input
                type="text"
                value={input.platforms}
                name="platforms"
                onChange={handleChange}
              />
              {error.platforms && <p>{error.platforms}</p>}
            </div>
            <div className={style.description}>
              <label htmlFor="" className={style.label}>
                Descripción:
              </label>
              <textarea
                type="text"
                value={input.description}
                name="description"
                onChange={handleChange}
                className={style.textarea}
              />
              {error.description && <p>{error.description}</p>}
            </div>
            <div className={style.description}>
              <label htmlFor="">Fecha de lanzamiento:</label>
              <input
                type="date"
                value={input.date}
                name="date"
                onChange={handleChange}
              />
              {error.date && <p>{error.date}</p>}
            </div>

            <div className={style.genres}>
              <label htmlFor="">Géneros:</label>

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
              {error.genres && <p>{error.genres}</p>}
            </div>
            <div>
              <label htmlFor="">Existencias</label>
              <input
                value={input.stock}
                name="stock"
                type="number"
                onChange={handleChange}
              />
            </div>
            <div className={style.description}>
              <label htmlFor="">Calificación:</label>
              <input
                type="number"
                value={input.rating}
                name="rating"
                onChange={handleChange}
              />
              {error.rating && <p>{error.rating}</p>}
            </div>
            <button
              type="submit"
              id="submit"
              disabled={!isFormValid}
              className={style.buton}
            >
              {isFormValid ? "¡Crear!" : "No está listo"}
            </button>
          </form>

        </div>

        <div className={style.side}>
          <div className={style.cardinfo}>
            <h3 className={style.cardname}>Nombre: {input.name}</h3>
            <h4>Géneros: {input.genres.map((el) => el + ", ")}</h4>
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default CreateGame;
