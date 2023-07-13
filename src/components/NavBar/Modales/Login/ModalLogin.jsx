import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Login.module.css";
import ButtonGoogleLogin from "./googleSingin/ButtonGoogleLogin";
import "./Modal.css";
import { getDataUser } from "../../../../actions";

function ModalLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const clickRegister = () => {
    //completar con la funcion openRegister
  };

  const handleOpenModalLogin = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("/users/login", user);
      const Token = response.data.token;
      console.log(Token);
      const dataUser = {
        nombre: response.data.user.userName,
        userID: response.data.user.id,
        cartID: response.data.user.Carrito?.id,
      };
      dispatch(getDataUser(dataUser));
      localStorage.setItem("userData", JSON.stringify(dataUser));
      localStorage.setItem("Token", JSON.stringify(Token));
      handleCloseModal();
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleOpenModalLogin} className={styles.navButton}>
          Login
        </button>
        {isOpen && (
          <div className="modal-overlay-login">
            <div className="modal-content-login">
              <button onClick={handleCloseModal} className={styles.navButton}>
                Close
              </button>
              <h2 className={styles.loginFormH2}>Sing In</h2>
              <form onSubmit={handleSubmit} className={styles.loginFormForm}>
                <div className={styles.loginForm}>
                  <div className={styles.labelLoginData}>
                    <label htmlFor="email">Email:</label>
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
                    <label className={styles.loginFormLabel} htmlFor="password">
                      Password:
                    </label>
                  </div>
                  <div>
                    <input
                      className={styles.loginFormInput}
                      type="password"
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      minLength="8"
                      pattern="(?=.*\d)(?=.*[A-Z])\w+"
                      title="Please enter a password with at least 8 characters, one uppercase letter, and one number"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className={styles.buttonRegister}>
                  Login
                </button>
              </form>
              <ButtonGoogleLogin
                className={styles.buttonGoogle}
                handleCloseModal={handleCloseModal}
              />
              <br />
              <div className={styles.goLogin}>
                No account? please
                <a onClick={clickRegister}> REGISTER</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalLogin;
