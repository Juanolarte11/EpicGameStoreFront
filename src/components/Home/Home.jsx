import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getCartUser, getGenres } from "../../actions/index.js";
import LoadingPage from "../loadingPage/LoadingPage.jsx";
import styles from "./Home.module.css";
import NavBar from "../NavBar/NavBar.jsx";
import ConteinerCars from "../ContainerCards/ConteinersCard.jsx";
import axios from "axios";
import ModalLogin from "../NavBar/Modales/Login/ModalLogin.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const buttonFavorites = "Add favorites";
  const allVideogames = useSelector((state) => state.videogames);
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const Token = JSON.parse(localStorage.getItem("Token"));
  const [sizeCart, setSizeCart] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  dispatch(getGenres());

  const handleClickCart = async (gameId) => {
    if (!dataUser.userID) {
      console.log("login please...");
    } else {
      try {
        const data = {
          gameID: gameId,
          userId: dataUser.userID,
        };
        const response = await axios.post(`http://localhost:3001/cart`, data);
        dispatch(getCartUser(dataUser.userID));
        setSizeCart(response.data[0].Videogames.length);
        setAlertMessage("Game added to Cart...");
        setShowAlert(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clickFavorite = async (gameId) => {
    try {
      const game = {
        userId: dataUser.userID,
        gameId: gameId,
      };
      const respuesta = await axios.post("/favorites", game);
      setAlertMessage("Game added to favorites...");
      setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    if (dataUser) {
      try {
        const response = await axios.get(
          `http://localhost:3001/cart/${dataUser.cartID}`
        );
        dispatch(getCartUser(dataUser.userID));
        setSizeCart(response?.data[0]?.Videogames?.length);
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <div>
      {allVideogames.length === 0 ? (
        <LoadingPage />
      ) : (
        <div className={styles.container}>
          <div>
            <NavBar size={sizeCart} />
          </div>
          { dataUser?.userID && showAlert ?  (<div className={styles.alert}>{alertMessage}</div> ): ''}
          {!dataUser?.userID && showAlert  ?  (<div className={styles.alert2}>Please login !</div>):''}
          <ConteinerCars
            allVideogames={allVideogames}
            handleClickCart={handleClickCart}
            clickFavorite={clickFavorite}
            buttonFavorites={buttonFavorites}
          />
        </div>
      )}
    </div>
  );
}
