import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";

const Card = ({ name, image, genres, id }) => {
  

  let allgenres = Array.isArray(genres)
    ? genres.map((el) => el.name).join(", ")
    : genres;

  return (
    <div className={style.card}>
      <h4 className={style.genre}>

        <ul className={style.genresList}>
          {Array.isArray(genres) ? (
            genres.map((el, i) => <li key={i}>{el.name}</li>)
          ) : (
            <li>{genres}</li>
          )}
        </ul>
        
      </h4>

      <img src={image} alt={name} />

      <div className={style.overlay}>
        <div className={style.cardinfo}>
          <Link to={`/videogame/${id}`} className={style.link}>
            <h3 className={style.title}>{name}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
