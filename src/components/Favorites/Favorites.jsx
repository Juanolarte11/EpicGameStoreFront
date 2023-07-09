import React, { useEffect, useState } from "react";
import ConteinerCars from "../ContainerCards/ConteinersCard";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const favorite = {name: "delete Favorite"}
  const dataUser = JSON.parse(localStorage.getItem("userData"))
   const obternerFavoritos = async() => {
    if(dataUser){
      try {
        const respuesta = await axios.get(`/users/${dataUser.userID}`);
        setFavorites(respuesta.data.Videogames)
      } catch (error) {
        console.log(error);
      }
    }
  }
  const clickFavorite = async(gameId) => {
    try {
      const game = {
        userId : dataUser.userID,
        gameId : gameId
      }
      await axios.post("/favorites/delete", game)
      const respuesta = await axios.get(`/users/${dataUser.userID}`);
      setFavorites(respuesta.data.Videogames)
      alert("game delete favorites")
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(async() => {await obternerFavoritos()},[])
  return (
    <div className="">
      <div>
        <NavBar />
      </div>
      <div>
        <ConteinerCars allVideogames={favorites} favorite={favorite} clickFavorite={clickFavorite}/>
      </div>
    </div>
  );
}

