import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import axios from 'axios';
import styles from './Login.module.css';
import ButtonGoogleLogin from './googleSingin/ButtonGoogleLogin'
import "./Modal.css";
import { getDataUser } from '../../../../actions';

function ModalLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);


  return (
    <div>
      <div>
        <button onClick={handleOpenModal} className={styles.navButton}>Login</button>
        {isOpen && (
          <div className="modal-overlay-login">
            <div className="modal-content-login">
              <button onClick={handleCloseModal} className={styles.navButton}>Cerrar</button>
              <h2 className={styles.loginFormH2}>Iniciar sesión</h2>
              <form onSubmit={handleSubmit} className={styles.loginFormForm}>
                <div className={styles.loginForm}>
                  <div className={styles.labelLoginData}>
                    <label htmlFor="email">Correo electrónico:</label>
                  </div>
                  <div>
                    <input
                      className={styles.loginFormInput}
                      type="email"
                      id="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className={styles.loginFormLabel} htmlFor="password">Contraseña:</label>
                  </div>
                  <div>
                    <input
                      className={styles.loginFormInput}
                      type="password"
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className={styles.buttonRegister}>Iniciar sesión</button>
              </form>
              <ButtonGoogleLogin className={styles.buttonGoogle} handleCloseModal={handleCloseModal}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalLogin;
