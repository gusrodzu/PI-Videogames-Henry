import SearchBar from "../SearchBar/SearchBar";
import style from "./navbar.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <div className={style.container}>
    
      <Link to="/home" className={style.logoContainer}>
        <img src={logo} alt="Logo" className={style.logo} />
      </Link>

      <div className={style.reloadContainer}>
        <button onClick={props.handleReload} className={style.reload}>
    ⟲
        </button>
      </div>


      <div className={style.searchBarContainer}>
      <SearchBar />
      </div>


    </div>
  );
};

export default NavBar;
