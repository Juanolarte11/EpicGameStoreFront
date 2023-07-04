import React from "react";
import style from "./NavBar.module.css";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import joystick from "../NavBar/joystick.jpg";
import Favorites from "../Favorites/Favorites";

export default function NavBar({ size, userName }) {
  return (
    <nav className={style.nav}>
      <div className={style.a}>
        <Link to="/home">HOME</Link>
        <Favorites />
        <Link to="/videogame">VENDER</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/register">REGISTER</Link>
      </div>
      <div>
        <IconButton aria-label="mostrar items" color="inherit">
          <Badge badgeContent={size} color="secondary">
            <Link to="/cart">
              <ShoppingCartIcon fontSize="large" color="inherit" />
            </Link>
          </Badge>
        </IconButton>
      </div>
      <div>
        <img className={style.userImg} src={joystick} alt="Imagen de perfil" />
      </div>
    </nav>
  );
}
