import React from 'react'
import styles from "./NavBar.module.css";
import { useState } from 'react';
import "./Modal.css";

function UserModal() {
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
         <button onClick={handleOpenModal} className={styles.userIcon}>
           <span className={styles.userSpan}>{iconUser}</span>
         </button>
         {isOpen && (
            <div className="modal-overlay">
            <div className="modal-content">
            <div className={styles.container}>
            <button onClick={handleCloseModal} className={styles.navButton}>Cerrar</button>
            <h2>Rol: {"a completar segun usuario"}</h2>
            <h2> {dataUser.nombre.toUpperCase()}</h2>
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