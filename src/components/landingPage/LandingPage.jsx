import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landingPage.module.css';
import portada from '../Home/LogoPortada.webp';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';

function LandingPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <a href="#" className={styles.logo}>
          EpicGameStore
        </a>
<<<<<<< HEAD
        {/* <div className={styles.navButtons}>
=======
        <div className={styles.navButtons}>
>>>>>>> 8be15ba2127475f3d682a1fec5c514e84fa2aef1
          <Link to="/login">
            <button className={styles.navButton}>Login</button>
          </Link>
          <Link to="/register">
            <button className={styles.navButton}>Register</button>
          </Link>
<<<<<<< HEAD
        </div> */}
=======
        </div>
>>>>>>> 8be15ba2127475f3d682a1fec5c514e84fa2aef1
      </nav>
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.heading}>Welcome to EpicGameStore!</h1>
          <Link to="/home">
            <button className={styles.enterButton}>Play</button>
          </Link>
        </div>
        <img className={styles.img} src={portada} alt="Logo Portada" />
      </main>
      <footer className={styles.footer}>
        <p className={styles.copy}>&copy; 2023 EpicGameStore. All rights reserved.</p>
        <div className={styles.socialMedia}>
          <a href="#" className={styles.socialLink}>
            <FaFacebook />
          </a>
          <a href="#" className={styles.socialLink}>
            <FaTwitter />
          </a>
          <a href="#" className={styles.socialLink}>
            <FaInstagram />
          </a>
          <a href="#" className={styles.socialLink}>
            <FaYoutube />
          </a>
          <a href="#" className={styles.socialLink}>
            <FaGithub />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
