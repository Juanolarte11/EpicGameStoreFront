import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./User.module.css";
import { Link } from "react-router-dom";

function User() {
  const userLog = useSelector((state) => state.dataUser);

  return (
    <div className={style.container}>
      <h1>Rol: {"a completar segun usuario"}</h1>
      <hr />
      <h1> {userLog.nombre.toUpperCase()}</h1>
      <h4>{"mis datos(posibilidad de cambio de password y nickname)"}</h4>
      <h4>{"lista de favoritos"}</h4>
      <h4>{"registro de compras"}</h4>
      <h4>{"registro de ventas"}</h4>

      <Link to="/home" className={style.link}>
        HOME
      </Link>
    </div>
  );
}

export default User;
