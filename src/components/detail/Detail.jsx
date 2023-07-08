import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, setCurrentPage } from "../../actions";
import { useHistory } from "react-router-dom";
import LoadingPage from "../loadingPage/LoadingPage.jsx";
import styles from "./Detail.module.css";
import NavBar from "../NavBar/NavBar.jsx";
import axios from "axios";
import { getCartUser } from "../../actions";

export default function Detail(props) {

  const id = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => dispatch(getDetail(id)), [dispatch]);
  const dataUser = JSON.parse(localStorage.getItem("userData"))
  const user = useSelector(state => state.dataUser.cartID)
  const userca = useSelector(state => state.cartUser)

  const videogameDetail = useSelector((state) => state.detail);

  const addCarrito = async (gameId) => {
    const gameInCart = userca?.filter((e) => e.id === id)
    if (gameInCart.length) {
      alert("the game is already in the cart")
    }
    if (!dataUser) {
      history.push("/register")
    } else {
      try {
        const data = {
          gameID: gameId,
          userId: dataUser
        };
        await axios.post(`http://localhost:3001/cart`, data);
        dispatch(getCartUser(user))
      } catch (error) {
        console.log(error);
      };
    };

  };

  const origin = isNaN(id) ? "db" : "api";

  let apiRatings = [];
  if (origin === "api" && videogameDetail.ratings) {
    apiRatings = videogameDetail.ratings.map((rating) => rating.title);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(setCurrentPage(1));
    history.push("/home");
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      {(origin === "api" &&
        (!videogameDetail.genres || !videogameDetail.platforms)) ||
        (origin === "db" &&
          (!videogameDetail.Genres || !videogameDetail.Platforms)) ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.titleImage}>
              <h1 className={styles.title}>{videogameDetail.name}</h1>
              <img
                className={styles.image}
                src={
                  origin === "api"
                    ? videogameDetail.background_image
                    : videogameDetail.image
                }
                alt=""
              />
            </div>
            <div className={styles.priceRating}>
              <h2>
                Launch date:{" "}
                {origin === "api"
                  ? videogameDetail.released
                  : videogameDetail.launchDate}
              </h2>
              <h2>
                Rating:{" "}
                {origin === "api"
                  ? apiRatings.join(", ")
                  : videogameDetail.rating}
              </h2>
              <h3>
                Platforms:{" "}
                {origin === "api"
                  ? videogameDetail.platforms
                    .map((el) => el.platform.name)
                    .join(", ")
                  : videogameDetail.Platforms.map((el) => el.platformName).join(
                    ", "
                  )}
              </h3>
              <h3>
                Genres:{" "}
                {origin === "api"
                  ? videogameDetail.genres.map((genre) => genre.name).join(", ")
                  : videogameDetail.Genres.map((genre) => genre.genreName).join(
                    ", "
                  )}
              </h3>
              <h3>
                ${videogameDetail.price}
              </h3>
              <button onClick={() => addCarrito(id)} className={styles.button}>Add to cart</button>
            </div>
          </div>
          <div className={styles.contentDes}>
            <h2 className={styles.description}>
              {origin === "api" ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: videogameDetail.description,
                  }}
                ></span>
              ) : (
                videogameDetail.description
              )}
            </h2>
            <button onClick={(e) => handleClick(e)} className={styles.button}>
              Go back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
