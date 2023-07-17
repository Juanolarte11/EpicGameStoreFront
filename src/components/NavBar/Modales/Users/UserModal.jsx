import React from 'react'
import "./Modal.css";
import { useState } from 'react';
import styles from "./Users.module.css"
import { Link, Redirect } from 'react-router-dom';


function ModalUser({image}) {
  const [isOpen, setIsOpen] = useState(false);
<<<<<<< HEAD
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const iconUser = dataUser ? dataUser?.nombre?.charAt(0).toUpperCase() : "";
=======
    const dataUser = JSON.parse(localStorage.getItem("userData"));
    const iconUser = dataUser ? dataUser?.nombre?.charAt(0).toUpperCase() : "";
>>>>>>> a3340ba (181)

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const imageIcon = () => {
    if (image && image.length !== 0) {
      console.log(dataUser.image.length);
      return (
        <div>
          <img className={styles.userIcon} onMouseEnter={handleOpenModal} src={dataUser.image} alt="Foto de perfil" />
        </div>
      )
    } else {
      return (
        <button onMouseEnter={handleOpenModal} className={styles.userIcon} >{iconUser}</button>
      )
    }
  }

  return (
    <div>
      <div>
        {!isOpen && (
        imageIcon()
        )}</div>
      <div>
        {isOpen && (
          <button className={styles.userIcon} >{iconUser}</button>
        )}</div>

      {isOpen && (
        <div onMouseLeave={handleCloseModal}>
          <div className="modal-overlay">
            <div className={"modal-content"}>
              <p className={styles.h1}>Rol: {"a completar segun usuario"}</p>
              {dataUser.role === "cliente" ? (<Link to={"/miPerfil"}><p className={styles.h2}> {dataUser.nombre.toUpperCase()}</p></Link>) :
                (<Link to={"/admin"}><p className={styles.h2}> {dataUser.nombre.toUpperCase()}</p></Link>)}
              <h2>{"mis datos(posibilidad de cambio de password y nickname)"}</h2>
              <h2>{"lista de favoritos"}</h2>
              <h2>{"registro de compras"}</h2>
              <h2>{"registro de ventas"}</h2>
            </div>
          </div>
        </div>

      )}
    </div>



  )
}

export default ModalUser