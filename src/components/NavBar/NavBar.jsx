import React from "react";
import style from "./NavBar.module.css";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import joystick from "../NavBar/joystick.jpg";
import { useSelector } from "react-redux";

export default function NavBar({ size }) {
  const DataUser = useSelector((state) => state.dataUser);

  // console.log(DataUser.nombre.charAt(0).toUpperCase());
  return (
    <nav className={style.nav}>
      <div className={style.a}>
        <a href="/home">HOME</a>
        <a href="/favorites">FAVORITES</a>
        <a href="/videogame">VENDER</a>
        <a href="/about">ABOUT</a>
        <a href="/login">LOGIN</a>
        <a href="/register">REGISTER</a>
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
        <Link to="/user">
          <img
            className={style.userImg}
            src={
              DataUser && DataUser.nombre && DataUser.nombre.length > 0
                ? DataUser.nombre.charAt(0).toUpperCase()
                : joystick
            }
            alt="Imagen de perfil"
          />
        </Link>
      </div>
    </nav>
  );
}
