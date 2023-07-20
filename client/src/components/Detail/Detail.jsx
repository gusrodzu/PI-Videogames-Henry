import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions/index";
import { useEffect } from "react";
import style from "./detail.module.css";


import loaderimg from "../../assets/Loading progress.gif";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  const detail = useSelector((state) => state.detail);

  return (
    <div className={style.container}>
      <div
        className={style.cover}
        style={{ backgroundImage: `url(${detail?.image})` }}
      ></div>

      {detail.id == id ? (
        <div className={style.containertext}>
          <div className={style.text}>
            <div className={style.description}>
              <h2 className={style.name}>{detail?.name}</h2>

              {isNaN(id) ? (
                <p>{detail.description}</p>
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: detail?.description }}
                ></div>
              )}
              <br></br>
              <h2>Rating: {detail.rating}</h2>
              <br></br>
              <h2>Release Date: {detail.date}</h2>
              <br></br>

              <div className={style.lowerinfo}>
                <ul>
                  <h2>Platforms:</h2>
                  {isNaN(id)
                    ? detail?.platforms?.split(" ").map((el, i) => {
                        return <li key={i}>{el}</li>;
                      })
                    : detail.platforms.map((el, i) => {
                        return <li key={i}>{el}</li>;
                      })}
                </ul>

                <br></br>

                <ul>
                  <h2>Genres:</h2>
                  {isNaN(id)
                    ? detail.genres.map((el, i) => {
                        return <li key={i}>{el.name}</li>;
                      })
                    : detail.genres.map((el, i) => {
                        return <li key={i}>{el}</li>;
                      })}
                </ul>

                <br></br>
                <div>
                  <p>Stock: {detail?.stock}</p>
                </div>
              </div>

              <Link to="/home" className={style.buttonblue}>
                Regresar
              </Link>
            </div>
          </div>

          <div className={style.photo}>
            <img src={detail?.image} alt="" className={style.img} />
          </div>
        </div>
      ) : (
        <div className={style.loadingcontainer}>
          <div className={style.loader}>
          <div className= {style.loaderAnimacion}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
