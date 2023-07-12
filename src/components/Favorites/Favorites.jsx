import React, { useEffect, useState } from "react";
import ConteinerCars from "../ContainerCards/ConteinersCard";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const dataUser = JSON.parse(localStorage.getItem("userData"))
   const obternerFavoritos = async() => {
    if(dataUser){
      try {
        const respuesta = await axios.get(`/users/${dataUser.userID}`);
        setFavorites(respuesta.data.Videogames)
        console.log(respuesta);
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(async() => {await obternerFavoritos()},[])
  return (
    <div className="">
      <div>
        <NavBar />
      </div>
      <div>
        <ConteinerCars allVideogames={favorites} />
      </div>
    </div>
  );
}

