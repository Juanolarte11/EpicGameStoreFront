import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getCartUser } from "../../actions/index.js";
import LoadingPage from "../loadingPage/LoadingPage.jsx";
import styles from "./Home.module.css";
import NavBar from "../NavBar/NavBar.jsx";
import ConteinerCars from "../ContainerCards/ConteinersCard.jsx"

import axios from "axios";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const dataUser = JSON.parse(localStorage.getItem("userData"))
  const [sizeCart, setSizeCart] = useState(0)

  const handleClickCart = async(gameId) => {
    if (!dataUser.userID) {
      console.log("logeate");
     }else{
       try {
         const data = {
           gameID: gameId,
           userId: dataUser.userID
         };
         const response = await axios.post(`http://localhost:3001/cart`, data);
         dispatch(getCartUser(dataUser.userID))
        setSizeCart(response.data[0].Videogames.length)
       } catch (error) {
         console.log(error);
       };
     };
  }
 
  useEffect(async() => {
    if(dataUser){
      try {
        const response = await axios.get(`http://localhost:3001/cart/${dataUser.cartID}`);
         dispatch(getCartUser(dataUser.userID))
        setSizeCart(response.data[0].Videogames.length)
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(getVideogames());
  }, [dispatch]);
      return (
        <div>
          {allVideogames.length === 0 ? (
            <LoadingPage />
          ) : (
            <div className={styles.container}>
              <div>
                <NavBar size={sizeCart} />
              </div>
              <ConteinerCars
                allVideogames={allVideogames}
                handleClickCart={handleClickCart}
              />
            </div>
          )}
        </div>
      );
    }
