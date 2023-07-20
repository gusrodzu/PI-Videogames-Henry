import React from "react";
import { Link } from "react-router-dom";
import style from "./landingpage.module.css";
import control from "../../assets/Kerfin7_NEA_2332.png";

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
        <div>
          <div className={style.box}>
            <h2 className={style.title}>Bienvenidos</h2>
            <p className={style.text}>
              Aquí encontrarás una extensa colección de juegos para todas las
              plataformas y géneros, desde emocionantes juegos de acción y
              frenéticos shooters hasta cautivadoras historias de rol y
              apasionantes aventuras. Nuestro objetivo es brindarte acceso a una
              selección diversa y entretenida para que encuentres siempre algo
              que se adapte a tus gustos y preferencias
            </p>
            <Link to="/home" className={style.button}>
            ¡Comienza la partida!
            </Link>
          </div>
        </div>

        {/* <div className={style.photo}> Hola esta es la imagen </div> */}
        {/* <img src={control} alt="img" className={style.img} /> */}
      </div>
    </div>
  );
};

export default LandingPage;
