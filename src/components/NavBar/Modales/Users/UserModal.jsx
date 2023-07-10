import React from 'react'
import "./ModalUser.css";
import { useState } from 'react';
import styles from "./Users.module.css"


function UserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
    const dataUser = JSON.parse(localStorage.getItem("userData"));
    const iconUser = dataUser ? dataUser?.nombre?.charAt(0).toUpperCase() : "";

    const handleOpenModal = () => {
        setIsOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsOpen(false);
      };

  return (
    <div>
        <div>
        {!isOpen & !isActive &&  (
        <button onClick={handleOpenModal} className={styles.userIcon} >{iconUser}</button>
        )}</div>
        <div>
        {isOpen && (
        <button onClick={handleCloseModal} className={styles.userIcon} >{iconUser}</button>
        )}</div>


    {isOpen && (
        <div>    
          <div className="modal-overlay">
            <div className="modal-content">
              
            <h1>Rol: {"a completar segun usuario"}</h1>
            <h1> {dataUser.nombre.toUpperCase()}</h1>
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

export default UserModal