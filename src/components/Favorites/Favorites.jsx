import React, { useEffect, useState } from "react";
import ConteinerCars from "../ContainerCards/ConteinersCard";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCartUser } from "../../actions";
import NavbarSec from "../NavBarSec/NavSec";
import { StylesProvider } from "@material-ui/core";
import styles from "./Favorites.module.css";


export default function Favorites() {
  const dispatch = useDispatch();
  const buttonFavorites = "Delete favorites";
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [size, setSize] = useState([]);
  const dataUser = JSON.parse(localStorage.getItem("userData"));

  console.log(dataUser)

  const obternerFavoritos = async () => {
    if (dataUser) {
      try {
        const respuesta = await axios.get(`/users/${dataUser.userID}`);
        setFavorites(respuesta.data.Videogames);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClickCart = async (gameId) => {
    if (!dataUser.userID) {
      console.log("logeate");
    } else {
      try {
        const data = {
          gameID: gameId,
          userId: dataUser.userID,
        };
        const response = await axios.post(`http://localhost:3001/cart`, data);
        dispatch(getCartUser(dataUser.userID));
        setSize(response.data[0].Videogames.length);
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
      const respuesta = await axios.post(
        "http://localhost:3001/favorites/delete",
        game
      );
      alert("delete favorites");
      await obternerFavoritos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await obternerFavoritos();
  }, []);
  useEffect(async () => {
    if (cart?.length === 0) {
      try {
        const cartID = dataUser.cartID;
        const response = await axios.get(
          `http://localhost:3001/cart/${cartID}`
        );
        setCart(response.data[0]?.Videogames);
        setSize(response.data[0]?.Videogames.length);
      } catch (error) {}
    }
  }, []);

  ///////////
  const handleSort = (order) => {
    localStorage.setItem("order", order);
  };

  const handleSearch = (name) => {
  };

  const handleReset = () => {

    localStorage.removeItem("genres");
    localStorage.removeItem("order");
  };

  const handleGenres = (genre) => {
    localStorage.setItem("genres", genre.target.value);
  };

  ///////
  return (
    <div>
      <div>
        <NavBar size={size} />
      </div>
      {favorites?.length === 0 ? (
        <div className={styles.container}>          
          <div><NavbarSec
          handleSort={handleSort}
          handleSearch={handleSearch}
          handleReset={handleReset}
          handleGenres={handleGenres}
          ></NavbarSec>
          </div>
          <div><h2>No favorite games...</h2></div>
        </div>
      ) : (
        <div>
          <ConteinerCars
            allVideogames={favorites}
            clickFavorite={clickFavorite}
            buttonFavorites={buttonFavorites}
            handleClickCart={handleClickCart}
          />
        </div>
      )}
    </div>
  );
}
