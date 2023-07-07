import React from "react";
import { FaStar } from 'react-icons/fa';
import styles from "./Card.module.css"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCartUser } from "../../actions";
import axios from "axios";

export default function Card({ game, handleClickCart }) {
  // let userData = JSON.parse(localStorage.getItem("userData"))
  let userData = {}
  const { name, price, rating, image, Genres } = game;
  const divisa = "USD"
  const decuent = "-30%"
  const roundedRating = Math.round(rating);
  const history = useHistory();
  const dispatch = useDispatch()
  const stars = Array?.from({ length: 5 }, (_, index) => {
    if (index < roundedRating) {
      return <FaStar key={index} className={styles.starFilled} />;
    } else {
      return <FaStar key={index} className={styles.starEmpty} />;
    }
  });
  const addCarrito = async (gameId) => {
    if (!userData) {
     history.push("/register") 
    }else{
      try {
        const data = {
          gameID: gameId,
          userId: userData.userID
        };
        await axios.post(`http://localhost:3001/cart`, data);
        handleClickCart(1)
        dispatch(getCartUser(userData.userID))
      } catch (error) {
        console.log(error);
      };
    };
  };
  return (
    <div className={styles.carGame}>
      <div className={styles.imageContainer}>
        <div className={styles.spaceImage}>
        <img src={image} alt={name} className={styles.image} />
        </div>
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <h3 className={styles.gameName}>{name}</h3>
            <div className={styles.rating}>{stars}</div>
            <div className={styles.genres}>{renderGenreTags(Genres)}</div>
           <div className={styles.contButtons}>
           <button className={styles.addButton} onClick={() => addCarrito(game.id)}>Add to Cart</button>
            <button className={styles.favoriteButton}>Add to Favorites</button>
           </div >
            <div className={styles.contPrice}>
                <p className={styles.gameDesc}>{decuent}</p>
                <p className={styles.gameDivisa}>{divisa}</p>
                <p className={styles.gamePrice}>{price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function renderGenreTags(genres) {
  return genres?.map((genre, index) => (
    <span className={styles.genreTag} key={index}>
      {genre.genreName}
    </span>
  ));
}
