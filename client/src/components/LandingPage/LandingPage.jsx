import React from "react";
import { Link } from "react-router-dom";
import style from "./landingpage.module.css";
import control from "../../assets/Game Controller.png";


const LandingPage = () => {
  return (
    // <div className={style.backgound}>
    //   <div className={style.container}>
    //     <h1 className={style.tittle}>Bienvenido</h1>
    //     <br></br>
    //     <div className={style.containerbox}>
    //       <Link to="/home" className={style.link}>
    //         <button className={style.button}> ↳</button>
    //       </Link>
    //     </div>
    //  </div>
    // </div>

    <div className={style.container}>
        <div className={style.containertext}>
          <div className={style.title}>
            <div className={style.box}>
              <h2>Hola Bienvendidos</h2>
              <Link to="/home" className={style.button}>
                Ingresar
              </Link>

            </div>
          </div>

          {/* <div className={style.photo}> Hola esta es la imagen </div> */}
          <img src={control} alt="img" className={style.img} />
        </div>
    </div>
  );
};

export default LandingPage;
