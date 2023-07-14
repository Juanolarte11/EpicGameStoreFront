import React from 'react'
import "./Modal.css";
import { useState } from 'react';
import styles from "./Users.module.css"
import { Link, Redirect } from 'react-router-dom';


function ModalUser() {
  const [isOpen, setIsOpen] = useState(false);
    const dataUser = JSON.parse(localStorage.getItem("userData"));
    console.log(dataUser);
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
        {!isOpen  &&   (
        <button onMouseEnter={handleOpenModal} className={styles.userIcon} >{iconUser}</button>
        )}</div>
        <div>
        {isOpen &&  (
        <button className={styles.userIcon} >{iconUser}</button>
        )}</div>

    {isOpen && (
        <div onMouseLeave={handleCloseModal}>    
          <div className="modal-overlay">          
          <div className={"modal-content"}>
     
            <p className={styles.h1}>Rol: {"a completar segun usuario"}</p>
            { dataUser.role === "cliente" ? (<Link to={"/miPerfil"}><p className={styles.h2}> {dataUser.nombre.toUpperCase()}</p></Link>) : 
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