import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterVideogames,
  filterOrigin,
  Order,
} from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Pager from "../Pager/Pager";
import Card from "../Card/Card";
import style from "./home.module.css";
import { Link } from "react-router-dom";


// IMAGENES
import control from "../../assets/Game Controller.png";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  const allGames = useSelector((state) => state.videogames);

  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

  const handleReload = () => {
    dispatch(getVideogames());
  };

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterGenre = (e) => {
    const valor = e.target.value;
    dispatch(filterVideogames(valor));
  };

  const handleFilterOrigin = (e) => {
    dispatch(filterOrigin(e.target.value));
  };

  const handleOrder = (e) => {
    const value = e.target.value;
    dispatch(Order(value));
    setCurrentPage(1);
    setOrden(`Ordenado ${value}`);
  };

  return (
    <div>
      <NavBar handleReload={handleReload} />

      <div className={style.containerhome}>
        <aside className={style.leftSide}>
          <p>Selecciona las opciones que deseas aplicar.</p>

          <label className={style.label}>Género</label>
          <select onChange={handleFilterGenre} className={style.select}>
          <option value="All">Todos</option>
            <option value="Action">Acción</option>
            <option value="Indie">Indie</option>
            <option value="Adventure">Aventura</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Estrategia</option>
            <option value="Shooter">Disparos</option>
            <option value="Casual">Casual</option>
            <option value="Simulation">Simulación</option>
            <option value="Puzzle">Rompecabezas</option>
            <option value="Arcade">Arcade</option>
            <option value="Platformer">Plataformas</option>
            <option value="Massively Multiplayer">Multijugador Masivo</option>
            <option value="Racing">Carreras</option>
            <option value="Sports">Deportes</option>
            <option value="Fighting">Lucha</option>
            <option value="Family">Familiar</option>
            <option value="Board Games">Juegos de Mesa</option>
            <option value="Educational">Educativo</option>
            <option value="Card">Cartas</option>
          </select>

          <label className={style.label}>Origen</label>
          <select onChange={handleFilterOrigin} className={style.select}>
          <option value="All">Todos</option>
            <option value="Api">De la API</option>
            <option value="DB">Creados por ti</option>
          </select>

          <label className={style.label}>Ordenar</label>
          <select onChange={handleOrder} className={style.select}>
          <option value="All">Reiniciar orden</option>
            <option value="ascAlf">Orden alfabético ascendente</option>
            <option value="descAlf">Orden alfabético descendente</option>
            <option value="ascRat">Mayor puntuación</option>
            <option value="descRat">Menor puntuación</option>
          </select>

          <Link to="/videogame" className={style.buttoncontainer}>
            <img src={control} alt="control" className={style.control} />
            <h2 className={style.title}>Crea tu propio videojuego</h2>
            <p className={style.text}>Prueba creando tu propio videojuego ➜</p>
          </Link>

        </aside>
      </div>

      <article className={style.article}>
        {currentGames.length === 0 ? (
          <div className={style.errorContainer}>
       
            <h2 className={style.errorText}>Oops, parece que no hay videojuegos disponibles.</h2>
            <p className={style.errorText}>Por favor, intenta de nuevo.</p>
            <button className={style.reloadButton} onClick={() => window.location.reload()}>
                Aceptar
            </button>
            
        </div>
          
        ) : (
          currentGames.map((vg) => (
            <Card
              key={vg.id}
              name={vg.name}
              image={vg.image}
              genre={vg.genre}
              genres={vg.genres}
              id={vg.id}
            />
          ))
        )}

      </article>

      <div>
        <Pager
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
};

export default Home;
