import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterVideogamesByOrigin,
  setCurrentPage,
  setOrigin,
  getDataUser
} from "../../actions/index.js";
import { Link, useLocation } from "react-router-dom";
import Card from "../Card/Card.jsx";
import Pages from "../pages/Pages.jsx";
import SearchBar from "../searchBar/SearchBar.jsx";
import LoadingPage from "../loadingPage/LoadingPage.jsx";
import styles from "./Home.module.css";
import noGameFif from "./noGame.gif";
import noGameSearh from "./noGameSearch.gif";
import NavBar from "../NavBar/NavBar.jsx";
import ConteinerCars from "../ContainerCards/ConteinersCard.jsx"

export default function Home() {

  const size = 0;
  const DataUser = useSelector(state => state.dataUser)
  console.log(DataUser); 
  let dataLocalUser = JSON.parse(localStorage.getItem("userData"))

  //estado del carrito
  const [currentCart, setCurrentCart] = useState([]);

  function handleClickCart(item) {
    let isPresent = false;
    currentCart.forEach((product) => {
      if (item.id === product.id) isPresent = true;
    });
    if (isPresent) return;
    setCurrentCart([...currentCart, item]);
  }
  if(dataLocalUser){
    dispatch(getDataUser(dataLocalUser))
  }

  const dispatch = useDispatch();
  const location = useLocation();
  const state = useSelector(state=>state)
  const allVideogames = useSelector((state) => state.videogames);
  // console.log(allVideogames);
  const pageNumber = useSelector((state) => state.currentPage);
  const origin = useSelector((state) => state.origin || "all");
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const [ratingOrder, setRatingOrder] = useState("");
  const [alphabeticalOrder, setAlphabeticalOrder] = useState("");
  const indexOfLastVideogame = pageNumber * videogamesPerPage; // 15
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0
console.log(allVideogames);
  useEffect(() => {
    dispatch(getVideogames());
    const handleLocationChange = () => {
      dispatch(setCurrentPage(1));
    };
    
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      dispatch(setCurrentPage(1));
      dispatch(setOrigin("all"));
      setRatingOrder("");
      setAlphabeticalOrder("");
    };
  }, [dispatch, location.pathname]);

      return (
        <div>
          {allVideogames.length === 0 ? (
            <LoadingPage />
          ) : (
            <div className={styles.container}>
              <div>
                <NavBar size={size} />
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
