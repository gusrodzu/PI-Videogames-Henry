import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../../redux/actions";
import style from "./searchbar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleImputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameVideogames(name));
    setName("");
  };

  return (
    <div className={style.container}>
    
      <input
        type="text"
        placeholder=" 🔍 Encuentra un videojuego"
        value={name}
        onChange={handleImputChange}
        className={style.input}
      />
      
      <button type="submit" onClick={handleSubmit} className={style.buton}>
        Buscar
      </button>
      
    </div>
  );
};

export default SearchBar;
