import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import style from "./Cart.module.css";
import axios from "axios";
import MercadoPago from "./MercadoPago/MercadoPago";
import { getCartUser } from "../../actions";

const Cart = () => {
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [size, setSize] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.dataUser.cartID);
  const divisa = "USD";
  const decuent = "-30%";
  useEffect(() => {
    handleDataCart();
  }, []);

  useEffect(() => {
    handlePrice();
  }, [cart]);

  const handleDataCart = async () => {
    if (cart?.length === 0) {
      try {
        const cartID = dataUser.cartID;
        const response = await axios.get(`http://localhost:3001/cart/${cartID}`);
        setCart(response.data[0]?.Videogames);
        setSize(response.data[0]?.Videogames.length);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteGame = async (gameId) => {
    try {
      const cartIdLocal = dataUser.cartID;
      const data = {
        gameID: gameId,
        cartID: cartIdLocal,
      };
      const response = await axios.post(`http://localhost:3001/cart/delete`, data);
      setCart(response.data[0]?.Videogames);
      setSize(response.data[0]?.Videogames.length);
      dispatch(getCartUser(user));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrice = () => {
    const total = cart?.reduce((accumulator, item) => {
      return accumulator + item.quantity * item.unit_price;
    }, 0);
    setPrice(total);
  };

  const handleGoHome = () => {
    history.push("/home");
  };

  return (
    <div className={style.all}>
      <div>
        <NavBar size={size} />
      </div>
      <div className={style.total}>
        <span>Total: {price?.toFixed(2)}</span>
      </div>
      {price > 0 && (
        <div className={style.pay}>
          <MercadoPago arrayGames={cart} />
        </div>
      )}
      {cart?.length > 0 ? (
        cart.map((item) => (
          <div key={item.id} className={style.cart_box}>
            <div className={style.cart_img}>
              <img src={item.image} alt={item.title} className={style.image} />
              <div>
                <button className={style.removeButton} onClick={() => deleteGame(item.id)}>
                  Remove
                </button>
              </div>
            </div>
            <div>
              <div className={style.contPrice}>
                <p className={style.gameDesc}>{decuent}</p>
                <p className={style.gameDivisa}>{divisa}</p>
                <p className={style.price}> {item.unit_price}</p>
              </div>
              <h1 className={style.title}>{item.title}</h1>
            </div>
          </div>
        ))
      ) : (
        <div className={style.emptyCart}>
          <p className={style.title}>Aún no hay juegos en tu carrito</p>
          <button className={style.goHomeButton} onClick={handleGoHome}>
            Ir al Home
          </button>
        </div>
      )}
    </div>
  );
  
};

export default Cart;
