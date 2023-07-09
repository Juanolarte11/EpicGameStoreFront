import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Pagination from "@mui/material/Pagination";
import styles from "./ConteinerCars.module.css"; 
import NavbarSec from "../NavBarSec/NavSec";

export default function ConteinerCars({ allVideogames, handleClickCart, clickFavorite, favorite }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const videogamesPerPage = 15;

  useEffect(() => {
    let localOrder = localStorage.getItem("order");
    if (localOrder && localOrder.length > 0) {
      setSortOrder(localOrder);
    }
  }, []);

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

  const filteredVideogames = allVideogames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedVideogames = [...filteredVideogames].sort((a, b) => {
    switch (sortOrder) {
      case "AtoZ":
        return a.name.localeCompare(b.name);
      case "ZtoA":
        return b.name.localeCompare(a.name);
      case "PriceAsc":
        return a.price - b.price;
      case "PriceDesc":
        return b.price - a.price;
      case "RatingAsc":
        return a.rating - b.rating;
      case "RatingDesc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleSort = (order) => {
    localStorage.setItem("order", order)
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };
  return (
    <div className={styles.container}>
      <NavbarSec handleSort={handleSort} handleSearch={handleSearch} handleReset={handleReset} />
      <div className={styles.cardsContainer}>
        {sortedVideogames
          .slice(indexOfFirstVideogame, indexOfLastVideogame)
          .map((game) => (
            <Card key={game.id} game={game} handleClickCart={handleClickCart} clickFavorite={clickFavorite} favorite={favorite}/>
          ))}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          count={Math.ceil(sortedVideogames.length / videogamesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}
