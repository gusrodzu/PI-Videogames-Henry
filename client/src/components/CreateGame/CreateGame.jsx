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
          {/* Formulrio */}
        <form onSubmit={handleSubmit} className={style.form}>
        <h1 className={style.title}>Crea tu propio videojuego</h1>
        <br></br>
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



          <div className={style.navBar}>
          
          <Link to="/home" className={style.buttonblack}>
            Regresar
          </Link>
        </div>
        </form>

        {/* Card Create */}
        <div className={style.cardhold}>
          <div className={style.cardinfo}>
            <img src={input.image ? input.image : loading} alt={input.name} />
            <h3 className={style.cardname}>Name: {input.name}</h3>
            <h3 className={style.cardname}>Platforms: {input.platforms}</h3>
            <h3 className={style.cardname}>Date: {input.date}</h3>
            <h3 className={style.cardname}>Genres: {input.genres.join(", ")}</h3>
            <h3 className={style.cardname}>Stock: {input.stock}</h3> 
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







// //Módulos
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// //Funciones
// import { useDispatch, useSelector } from "react-redux";
// import validate from "./validate";

// // Acciones 'postVideogame' y 'getGenre'
// import { postVideogame, getGenre } from "../../redux/actions/index";

// // Imagenes
// import loading from "../../assets/locked_level.png";

// // CSS
// import style from "./creategame.module.css";

// const CreateGame = () => {
//   const dispatch = useDispatch();
//   const genres = useSelector((state) => state.genres);

//   useEffect(() => {
//     dispatch(getGenre());
//   }, [dispatch]);

//   const [error, setError] = useState({});
//   const [input, setInput] = useState({
//     name: "",
//     image: "",
//     genres: [],
//     description: "",
//     platforms: [],
//     date: "",
//     rating: 0,
//   });

//   const platformOptions = [
//     "3DO",
//     "ATARI 2600",
//     "ATARI 5200",
//     "ATARI 7800",
//     "ATARI 8bit",
//     "ATARI Flashback",
//     "ATARI Links",
//     "ATARI ST",
//     "ATARI XEGS",
//     "Apple II",
//     "Android",
//     "Classic Macintosh",
//     "Commodore/Amiga",
//     "Dreamcast",
//     "Game Boy",
//     "Game Boy Advance",
//     "Game Boy Color",
//     "GameCube",
//     "Genesis",
//     "iOS",
//     "Linux",
//     "Mac OS",
//     "NES",
//     "NEO GEO",
//     "Nintendo 3DS",
//     "Nintendo 64",
//     "Nintendo DS",
//     "Nintendo DSi",
//     "Nintendo Switch",
//     "PC",
//     "PS Vita",
//     "PSP",
//     "PlayStation",
//     "PlayStation 2",
//     "PlayStation 3",
//     "PlayStation 4",
//     "PlayStation 5",
//     "Sega 32X",
//     "Sega CD",
//     "Sega Master System",
//     "Sega Saturn",
//     "SNES",
//     "Web",
//     "Wii",
//     "Wii U",
//     "Xbox",
//     "Xbox 360",
//     "Xbox One",
//     "Xbox Series X",
//     "Jaguar",
// ];


//   const [selectedPlatform, setSelectedPlatform] = useState("");

//   const handlePlatformChange = (e) => {
//     setSelectedPlatform(e.target.value);
//   };

//   const handleChange = (e) => {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//     setError(
//       validate({
//         ...input,
//         [e.target.name]: e.target.value,
//       })
//     );
//   };

//   const handleCheck = (e) => {
//     const { value, checked } = e.target;
//     setInput((prevInput) => {
//       if (checked) {
//         return { ...prevInput, genres: [...prevInput.genres, value] };
//       } else {
//         return {
//           ...prevInput,
//           genres: prevInput.genres.filter((genre) => genre !== value),
//         };
//       }
//     });

    
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(postVideogame(input));
//     alert("Personaje creado");

//     setInput({
//       name: "",
//       image: "",
//       genres: [],
//       description: "",
//       platforms: [],
//       date: "",
//       rating: 0,
//     });
//   };

//   const isFormValid =
//     input.name.trim() !== "" &&
//     input.image.trim() !== "" &&
//     input.genres.length > 0 &&
//     input.description.trim() !== "" &&
//     input.platforms.trim() !== "" &&
//     input.date.trim() !== "" &&
//     input.rating >= 0;

//   return (
//     <div className={style.container}>
//       <div className={style.content}>
//         {/* Formulrio */}
//         <form onSubmit={handleSubmit} className={style.form}>
//           <h1 className={style.title}>Crea tu propio videojuego</h1>
//           <br></br>

//           {/* nombre */}
//           <div className={style.field}>
//             <label>Nombre:</label>
//             <input
//               placeholder="Nombre"
//               type="text"
//               id="name"
//               value={input.name}
//               name="name"
//               onChange={handleChange}
//             />
//             {error.name && <p className={style.error}>{error.name}</p>}
//           </div>

//           {/* imagen */}
//           <div className={style.field}>
//             <label htmlFor="image">Image:</label>
//             <input
//               type="text"
//               id="image"
//               value={input.image}
//               name="image"
//               placeholder="Insert the link"
//               onChange={handleChange}
//             />
//             {error.image && <p className={style.error}>{error.image}</p>}
//           </div>

//           {/* Plataforma */}
//           <div className={style.field}>
//             <label htmlFor="platform">Plataforma:</label>
//             <select
//               id="platform"
//               value={selectedPlatform}
//               name="platforms"
//               onChange={handlePlatformChange}
//               className={style.select}
//             >
//               <option value="">Selecciona una plataforma</option>
//               {platformOptions.map((platform, i) => (
//                 <option key={i} value={platform}>
//                   {platform}
//                 </option>
//               ))}
//             </select>
//             {error.platforms && (
//               <p className={style.error}>{error.platforms}</p>
//             )}
//           </div>

//           {/* fecha */}
//           <div className={style.field}>
//             <label htmlFor="date">Release date:</label>
//             <input
//               type="date"
//               id="date"
//               value={input.date}
//               name="date"
//               onChange={handleChange}
//             />
//             {error.date && <p className={style.error}>{error.date}</p>}
//           </div>

//           {/* Genero */}
//           <div className={style.field}>
//             <label htmlFor="checkbox">Genros:</label>

//             <div className={style.types}>
//               {genres.map((genre, i) => {
//                 return (
//                   <label key={i} className={style.type}>
//                     <input
//                       type="checkbox"
//                       value={`${genre.name}`}
//                       name={`${genre.name}`}
//                       onChange={handleCheck}
//                     />
//                     {`${genre.name}`}
//                   </label>
//                 );
//               })}
//             </div>

//             {error.genres && <p className={style.error}>{error.genres}</p>}
//           </div>

//           {/* Rating */}
//           <div className={style.field}>
//             <label htmlFor="rating">Rating:</label>
//             <input
//               type="number"
//               id="rating"
//               value={input.rating}
//               name="rating"
//               onChange={handleChange}
//             />
//             {error.rating && <p className={style.error}>{error.rating}</p>}
//           </div>

//           {/* Descripcion */}
//           <div className={style.field}>
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               value={input.description}
//               name="description"
//               onChange={handleChange}
//               className={style.textarea}
//             />
//             {error.description && (
//               <p className={style.error}>{error.description}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             id="submit"
//             disabled={!isFormValid}
//             className={style.button}
//           >
//             {isFormValid ? "Crear" : "Crear"}
//           </button>

//           <div className={style.navBar}>
//             <Link to="/home" className={style.buttonblack}>
//               Regresar
//             </Link>
//           </div>
//         </form>

//         {/* Card Create */}
//         <div className={style.cardhold}>
//           <div className={style.cardinfo}>
//             <img src={input.image ? input.image : loading} alt={input.name} />
//             <h3 className={style.cardname}>Name: {input.name}</h3>
//             <h3 className={style.cardname}>Platforms: {input.platforms}</h3>
//             <h3 className={style.cardname}>Date: {input.date}</h3>
//             <h3 className={style.cardname}>
//               Genres: {input.genres.join(", ")}
//             </h3>
//             <h3 className={style.cardname}>Rating: {input.rating}</h3>
//             <br></br>
//             <h3 className={style.cardname}>Description: {input.description}</h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateGame;