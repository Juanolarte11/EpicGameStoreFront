import React, { useState } from "react";
// import ConteinerCars from "../../components/ContainerCards/ConteinersCard";
import ConteinerCars from "../ContainerCards/ConteinersCard";
// import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";

export default function Favorites() {
  console.log("estoy en favorites");
  const [favorites, setFavorites] = useState([{
    "id": "1272d8c1-c139-45e4-85bb-2625941a1581",
    "name": "Grand Theft Auto V",
    "description": null,
    "launchDate": null,
    "rating": 4.47,
    "image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    "screenshots": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg,https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg,https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg,https://media.rawg.io/media/screenshots/f95/f9518b1d99210c0cae21fc09e95b4e31.jpg,https://media.rawg.io/media/screenshots/a5c/a5c95ea539c87d5f538763e16e18fb99.jpg,https://media.rawg.io/media/screenshots/a7e/a7e990bc574f4d34e03b5926361d1ee7.jpg,https://media.rawg.io/media/screenshots/592/592e2501d8734b802b2a34fee2df59fa.jpg",
    "price": 43.92,
    "stock": 5,
    "active": true,
    "Genres": [
      {
        "id": "a4105871-ff70-48eb-b0d1-4af98884e1b8",
        "genreName": "Action"
      },
      {
        "id": "1522e4d9-c788-40c5-a1b1-6d30d86bcdb5",
        "genreName": "Adventure"
      }
    ],
    "Platforms": [
      {
        "id": "c755a955-d8e8-4a22-8d8a-56dfa30730e8",
        "platformName": "Xbox One"
      },
      {
        "id": "c8579c59-d4c5-427b-8680-983bef0b1736",
        "platformName": "Xbox 360"
      },
      {
        "id": "7dfb4d87-04cc-48e4-8514-0eb4249efa75",
        "platformName": "PlayStation 3"
      },
      {
        "id": "7105a471-3c3b-452e-8b74-36202fe1561d",
        "platformName": "PC"
      },
      {
        "id": "be91aa6c-2017-4716-9acf-33dd2161093c",
        "platformName": "PlayStation 4"
      },
      {
        "id": "47a5bc9e-72f7-4387-bf8e-66dff47555d6",
        "platformName": "Xbox Series S/X"
      },
      {
        "id": "c2c402e3-f652-455a-a1a8-48d720ebb0a5",
        "platformName": "PlayStation 5"
      }
    ],
    "Developer": {
      "id": "4809d398-c219-4b55-8d12-05ad657584e8",
      "name": "Rockstar North"
    }
  },
  {
    "id": "b65b1416-7b33-4a76-aa80-0c183494c4ac",
    "name": "The Witcher 3: Wild Hunt",
    "description": null,
    "launchDate": null,
    "rating": 4.66,
    "image": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    "screenshots": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg,https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg,https://media.rawg.io/media/screenshots/6a0/6a08afca95261a2fe221ea9e01d28762.jpg,https://media.rawg.io/media/screenshots/cdd/cdd31b6b4a687425a87b5ce231ac89d7.jpg,https://media.rawg.io/media/screenshots/862/862397b153221a625922d3bb66337834.jpg,https://media.rawg.io/media/screenshots/166/166787c442a45f52f4f230c33fd7d605.jpg,https://media.rawg.io/media/screenshots/f63/f6373ee614046d81503d63f167181803.jpg",
    "price": 22.9,
    "stock": 7,
    "active": true,
    "Genres": [
      {
        "id": "a4105871-ff70-48eb-b0d1-4af98884e1b8",
        "genreName": "Action"
      },
      {
        "id": "1522e4d9-c788-40c5-a1b1-6d30d86bcdb5",
        "genreName": "Adventure"
      },
      {
        "id": "3229cd85-7b5c-4253-9ea4-868a4a24721d",
        "genreName": "RPG"
      }
    ],
    "Platforms": [
      {
        "id": "c2c402e3-f652-455a-a1a8-48d720ebb0a5",
        "platformName": "PlayStation 5"
      },
      {
        "id": "c755a955-d8e8-4a22-8d8a-56dfa30730e8",
        "platformName": "Xbox One"
      },
      {
        "id": "7105a471-3c3b-452e-8b74-36202fe1561d",
        "platformName": "PC"
      },
      {
        "id": "2b0af6df-639e-406a-9e64-9cf81b1cb8b7",
        "platformName": "Nintendo Switch"
      },
      {
        "id": "be91aa6c-2017-4716-9acf-33dd2161093c",
        "platformName": "PlayStation 4"
      },
      {
        "id": "47a5bc9e-72f7-4387-bf8e-66dff47555d6",
        "platformName": "Xbox Series S/X"
      }
    ],
    "Developer": {
      "id": "82b916de-2895-498f-bf9f-1fb2148c8e28",
      "name": "CD PROJEKT RED"
    }
  },])
  //  let userData = JSON.parse(localStorage.getItem("userData"))

  //  const obternerFavoritos = async() => {
  //   if(userData?.userID?.length > 0){
  //     try {
  //       const dataFav = await axios.get(`/favoritos/${userData.userID}`);
  //       setFavorites(dataFav.data[0].Favoritos)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }
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

