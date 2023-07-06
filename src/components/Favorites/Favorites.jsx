import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import style from "./Favorites.module.css";
import axios from "axios";

const Favorites = () => {
  const dataUser = useSelector((state) => state.dataUser);
  const [cart, setCart] = useState([]);
  const history = useHistory();

  const handleDataFavorites = async () => {
    const cartID = dataUser.cartID;
    const response = await axios.get(`http://localhost:3001/cart/${cartID}`);
    setCart(response.data[0]?.Videogames);
  };

  const deleteGame = async (gameId) => {
    try {
      const cartIdLocal = dataUser.cartID;
      const data = {
        gameID: gameId,
        cartID: cartIdLocal,
      };
      const response = await axios.post(
        `http://localhost:3001/cart/delete`,
        data
      );
      setCart(response.data[0]?.Videogames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleDataFavorites();
  }, []);

  return (
    <div className={style.container}>
      <div>
        <NavBar />
      </div>
      {cart?.length > 0 ? (
        cart.map((item) => (
          <div key={item.id} className={style.detail}>
            <div className={style.cart_img}>
              <img src={item.image} alt={item.title} className={style.img} />
              <p>{item.title}</p>
            </div>
            <div>
              <p>{item.quantity}</p>
            </div>
            <div>
              <span>{item.unit_price}</span>
              <button onClick={() => deleteGame(item.id)}>Remove</button>
            </div>
          </div>
        ))
      ) : (
        <div className={style.emptyFavorites}>
          <p>There are no favorites games in your list</p>
          <button onClick={() => history.push("/home")}>Go Home</button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
