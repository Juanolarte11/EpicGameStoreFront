import "./Modal.css";
import React, { useState } from 'react';
import { getDataUser } from '../../actions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import styles from './Login.module.css';
import ButtonGoogleLogin from './googleSingin/ButtonGoogleLogin'


function ModalLogin() {
    
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
              setIsOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsOpen(false);
    };
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            email: email,
            password: password
        }
        try {
            const response = await axios.post('http://localhost:3001/users/login', user);
            const { id, userName, Carrito} = response.data
            const dataUser = {
                nombre: userName,
                userID: id,
                cartID: Carrito.id
            }
            const resDataUsuer = dispatch(getDataUser(dataUser))
            localStorage.setItem('userData', JSON.stringify(dataUser));
            handleCloseModal();
        } catch (error) {
            console.log(error)
        }
    };
    
  return (
    <div>
        <div>
            <button onClick={handleOpenModal} className={styles.navButton}>Login</button>
            {isOpen && (
                <div className="modal-overlay">
                <div className="modal-content">
                    {/* //////////////// */}
                    <button onClick={handleCloseModal} className={styles.navButton}>Cerrar</button>
                    <h2 className={styles.loginFormH2}>Iniciar sesión</h2>
            <form onSubmit={handleSubmit} className={styles.loginFormForm}>
                <div className={styles.loginForm}>

                    <div className={styles.labelLoginData}>
                    <label  htmlFor="email">Correo electrónico:</label> 
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
                    <label className={styles.loginFormLabel}  htmlFor="password">Contraseña:</label>
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
            <ButtonGoogleLogin className={styles.buttonGoogle}></ButtonGoogleLogin>                                             {/* //////////////// */}
                </div>
                </div>
            )}  
    </div>
    </div>
  )
}

export default ModalLogin