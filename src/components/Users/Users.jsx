import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Users.module.css";
import { Link } from "react-router-dom";

function User() {
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  console.log(dataUser);

  return (
    <div className={style.container}>
      <h1>Rol: {"a completar segun usuario"}</h1>
      <h1> {dataUser.nombre.toUpperCase()}</h1>
      <h2>{"mis datos(posibilidad de cambio de password y nickname)"}</h2>
      <h2>{"lista de favoritos"}</h2>
      <h2>{"registro de compras"}</h2>
      <h2>{"registro de ventas"}</h2>

      <Link to="/home" className={style.link}>
        HOME
      </Link>
    </div>
  );
}

export default User;
