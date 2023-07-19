import React, { useEffect, useState } from "react";
import ConteinerCars from "../ContainerCards/ConteinersCard";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCartUser } from "../../actions";

export default function Favorites() {
  const dispatch = useDispatch()
  const buttonFavorites = 'Delete favorites'
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([]);
  const [size, setSize] = useState([])
  const dataUser = JSON.parse(localStorage.getItem("userData"))
  const token = JSON.parse(localStorage.getItem("Token"));
   const obternerFavoritos = async() => {
    if(dataUser){
      try {
        const respuesta = await axios.get(`http://localhost:3001/users/userDetail/${dataUser.userID}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      console.log(respuesta.data.Videogames);
        setFavorites(respuesta.data.Videogames)
       
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleClickCart = async (gameId) => {
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
        setSize(response.data[0].Videogames.length)
       } catch (error) {
         console.log(error);
       };
     };
  }

  const clickFavorite = async(gameId) => {
    try {
      const game = {
        userId : dataUser.userID,
        gameId : gameId
      }
      const respuesta = await axios.post("http://localhost:3001/favorites/delete", game)
      alert("delete favorites")
      await obternerFavoritos()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(async() => {await obternerFavoritos()},[])
  useEffect(async () => {
    if (cart?.length === 0) {
      try {
        const cartID = dataUser.cartID;
        const response = await axios.get(`http://localhost:3001/cart/${cartID}`);
        setCart(response.data[0]?.Videogames);
        setSize(response.data[0]?.Videogames.length);
      } catch (error) {

      }
    }
  },[])
  return (
    <div className="">
      <div>
        <NavBar size={size}/>
      </div>
      <div>
        <ConteinerCars 
        allVideogames={favorites} 
        clickFavorite={clickFavorite}
        buttonFavorites={buttonFavorites}
        handleClickCart={handleClickCart} />
      </div>
    </div>
  );
}