import "./Modal.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import ButtonGoogleRegister from "./googleSingin/ButtonGoogleRegister";
/////////////////////
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
////////////////////
function ModalRegister() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUserPost = {
      userName: name,
      userPassword: password,
      userEmail: email,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/users/",
        newUserPost
      );
      const { newCart, newUser } = response.data;
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  /////////////////
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const response = await axios.get("http://localhost:3001/users/");
        const arrayUsers = response.data;

        const result = arrayUsers.find(
          (user) => user.userEmail === data.user.email
        );

        if (result) {
          alert("ya existe ese usuario");
        } else {
          history.push("/Home");
          const value = {
            userName: data.user.displayName,
            userPassword: "firepass",
            userEmail: data.user.email,
            userImage: data.user.photoURL,
            // data.user.photoURL '
            // userProvider: data.user.providerId,
            // userUid: data.user.uid
          };
          try {
            const respuestaPost = await axios.post(
              "http://localhost:3001/users/",
              value
            );
            handleCloseModal();
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  //////////////////////

  return (
    <div>
      <div>
        <button onClick={handleOpenModal} className={styles.navButton}>
          Register
        </button>
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              {/* //////////////// */}
              <button onClick={handleCloseModal} className={styles.navButton}>
                Cerrar
              </button>
              <div className={styles.RegistrationForm}>
                <h2 className={styles.loginFormH2}>Registro</h2>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <div>
                      <label htmlFor="name">Nombre:</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div>
                      <label htmlFor="email">Email:</label>
                    </div>
                    <div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div>
                      <label htmlFor="password">ContraseÃ±a:</label>
                    </div>
                    <div>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button className={styles.buttonRegister}>Registrarse</button>
                </form>
                <div>
                  {/* <ButtonGoogleRegister
                  className={styles.buttonGoogle}
                ></ButtonGoogleRegister> */}
                  <button className={styles.buttonGoogle} onClick={handleClick}>
                    Registrar con Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalRegister;
