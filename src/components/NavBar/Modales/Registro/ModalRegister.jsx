import "./Modal.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import ButtonGoogleRegister from "./googleSingin/ButtonGoogleRegister";

function ModalRegister(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const clickLogin = () => {
    // completar con la funcion handleOpenModalLogin
  };

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

  return (
    <div>
      <div>
        <button onClick={handleOpenModal} className={styles.navButton}>
          Register
        </button>
        {isOpen && (
          <div className="modal-overlay-register">
            <div className="modal-content-register">
              <button onClick={handleCloseModal} className={styles.navButton}>
                Close
              </button>
              <div className={styles.RegistrationForm}>
                <h2 className={styles.loginFormH2}>REGISTER YOUR ACCOUNT</h2>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <div>
                      <label htmlFor="name">Name:</label>
                    </div>
                    <div>
                      <input
                        placeholder="Name..."
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
                        placeholder="Email..."
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        pattern="/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/"
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div>
                      <label htmlFor="password">Password:</label>
                    </div>
                    <div>
                      <input
                        placeholder="Password..."
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
                  <button className={styles.buttonRegister}>Register</button>
                </form>
                <div>
                  <ButtonGoogleRegister
                    className={styles.buttonGoogle}
                    handleCloseModal={handleCloseModal}
                  ></ButtonGoogleRegister>
                </div>
                <hr />
                <div className={styles.goLogin}>
                  Are you registered? please
                  <a onClick={props.handleOpenModalLogin}> LOGIN</a>
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
