import React from "react";
import { Link } from "react-router-dom";
import style from "./landingpage.module.css";

const LandingPage = () => {
  return (
    <div className={style.backgound}>
      <div className={style.container}>
        <h1 className={style.h1}>Bienvenido</h1>
        <br></br>
        <div className={style.containerbox}>
          <Link to="/home" className={style.link}>
            <button className={style.buton}>ir</button>
          </Link>
        </div>
     </div>
    </div>
  );
};

export default LandingPage;
