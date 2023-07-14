import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import axios from 'axios';
import styles from './Login.module.css';
import ButtonGoogleLogin from './googleSingin/ButtonGoogleLogin'
import "./Modal.css";
import { getDataUser } from '../../../../actions';

const ModalLogin = ({ handleCloseRegister }) => {

  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsOpenLogin(true);  
  };
  console.log(isOpenLogin)

  const handleCloseLogin = () => {
    setIsOpenLogin(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password
    }
    try {
      const response = await axios.post('/users/login', user);

      const Token = response.data.token
      console.log(Token);
      const dataUser = {
        nombre: response.data.user.userName,
        userID: response.data.user.id,
        cartID: response.data.user.Carrito?.id
      }
      dispatch(getDataUser(dataUser));
      localStorage.setItem('userData', JSON.stringify(dataUser));
      localStorage.setItem('Token', JSON.stringify(Token));
      handleCloseLogin();
    } catch (error) {
      alert("error")
      console.log(error);
    }
  };



  return (
    <div>
      <div>
        <button onClick={handleOpenModal} className={styles.navButton}>Login</button>
        {isOpenLogin && (
          <div className="modal-overlay-login">
            <div className="modal-content-login">
              <button onClick={handleCloseLogin} className={styles.navButton}>Cerrar</button>
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
              <ButtonGoogleLogin className={styles.buttonGoogle} handleCloseLogin={handleCloseLogin}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalLogin;
