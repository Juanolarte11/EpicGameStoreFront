import React from "react";
import "./Modal.css";
import { useState } from "react";
import styles from "./Users.module.css";
import { Link, Redirect } from "react-router-dom";

function ModalUser({ image }) {
  const [isOpen, setIsOpen] = useState(false);
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const iconUser = dataUser ? dataUser?.nombre?.charAt(0).toUpperCase() : "";

  const btnClick = () => {
    localStorage.setItem("userData", JSON.stringify({}));
    localStorage.setItem("Token", JSON.stringify({}));
    window.location.reload();
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const imageIcon = () => {
    if (image && image.length !== 0) {
      return (
        <div>
          <img
            className={styles.userIcon}
            onMouseEnter={handleOpenModal}
            src={dataUser.image}
            alt="Foto de perfil"
          />
        </div>
      );
    } else {
      return (
        <button onMouseEnter={handleOpenModal} className={styles.userIcon}>
          {iconUser}
        </button>
      );
    }
  };

  return (
    <div>
      <div>{!isOpen && imageIcon()}</div>
      <div>
        {isOpen && <button className={styles.userIcon}>{iconUser}</button>}
      </div>

      {isOpen && (
        <div onMouseLeave={handleCloseModal}>
          <div className="modal-overlay">
            <div className={"modal-content"}>
              <p className={styles.h1}>Rol: {"a completar segun usuario"}</p>
              {dataUser.role === "cliente" ? (
                <Link to={"/miPerfil"}>
                  <p className={styles.h2}> {dataUser.nombre.toUpperCase()}</p>
                </Link>
              ) : (
                <Link to={"/admin"}>
                  <p className={styles.h2}> {dataUser.nombre.toUpperCase()}</p>
                </Link>
              )}
              <h2>{"Mis datos"}</h2>

              {dataUser?.userID && (
                <button onClick={btnClick} className="navButton">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalUser;
