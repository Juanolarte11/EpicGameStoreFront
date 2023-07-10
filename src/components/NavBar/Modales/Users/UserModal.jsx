import React from 'react'
import "./Modal.css";
import { useState } from 'react';
import styles from "./Users.module.css"


function ModalUser() {
  const [isOpen, setIsOpen] = useState(false);
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
        {!isOpen  &&  (
        <button onClick={handleOpenModal} className={styles.userIcon} >{iconUser}</button>
        )}</div>
        <div>
        {isOpen &&  (
        <button onClick={handleCloseModal} className={styles.userIcon} >{iconUser}</button>
        )}</div>


    {isOpen && (
        <div>    
          <div className="modal-overlay">          
          <div className={"modal-content"}>
     
            <p className={styles.h1}>Rol: {"a completar segun usuario"}</p>
            <p className={styles.h2}> {dataUser.nombre.toUpperCase()}</p>
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