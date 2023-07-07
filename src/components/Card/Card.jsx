import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import noImage from "./noImageFound.jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Favorites from "../Favorites/Favorites";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getCartUser } from "../../actions";

export default function Card({
  name,
  price,
  image,
  id,
  rating,
  handleClickCart,
  item,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const userIdLocal = useSelector((state) => state.dataUser.userID);

  const userca = useSelector((state) => state.cartUser);
  const history = useHistory();
  /////
  const dispatch = useDispatch();
  const user = useSelector((state) => state.dataUser.cartID);
  /////////

  const favorites = [];
  const roundedRating = Math.round(rating);
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < roundedRating) {
      return <FaStar key={index} className={styles.starFilled} />;
    } else {
      return <FaStar key={index} className={styles.starEmpty} />;
    }
  });

  const addCarrito = async (gameId) => {
    const gameInCart = userca.filter((e) => e.id === id);
    if (gameInCart.length) {
      alert("the game is already in the cart");
    }
    if (!userIdLocal) {
      history.push("/register");
    } else {
      try {
        const data = {
          gameID: gameId,
          userId: userIdLocal,
        };
        await axios.post(`http://localhost:3001/cart`, data);
        handleClickCart(item);
        dispatch(getCartUser(user));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleToggleFavorite = () => {
    favorites.push({ image, name, price });
    setIsFavorite(!isFavorite);
    Favorites(favorites);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.rating}>{stars}</div>
        <button
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.favorite : ""
          }`}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <FavoriteIcon className={styles.favoriteIcon} />
          ) : (
            <FavoriteBorderIcon className={styles.favoriteIcon} />
          )}
        </button>
        <Link
          to={id === -5 ? "/videogame" : id === -6 ? "#" : `/home/${id}`}
          key={id}
        >
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={image || noImage}
              alt="image not found"
            />
          </div>
          <h3 className={styles.cardTitle}>{name}</h3>
          <h3 className={styles.cardTitle}>Price: U$S {price}</h3>
        </Link>
        <button className={styles.buton} onClick={() => addCarrito(id)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
