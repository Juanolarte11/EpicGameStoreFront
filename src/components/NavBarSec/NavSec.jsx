import React from 'react';
import styles from './Navbar.module.css';
import SearchBar from '../searchBar/SearchBar';
export default function NavbarSec({ handleSort, handleReset }) {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarNav}>
        <li className={styles.navItem}>
          <button onClick={() => handleSort("AtoZ")} className={styles.navLink}>
            Sort A to Z
          </button>
        </li>
        <li className={styles.navItem}>
          <button onClick={() => handleSort("ZtoA")} className={styles.navLink}>
            Sort Z to A
          </button>
        </li>
        <li className={styles.navItem}>
          <button onClick={() => handleSort("PriceAsc")} className={styles.navLink}>
            Sort Price Asc
          </button>
        </li>
        <li className={styles.navItem}>
          <button onClick={() => handleSort("PriceDesc")} className={styles.navLink}>
            Sort Price Desc
          </button>
        </li>
        <li className={styles.navItem}>
          <button onClick={() => handleSort("RatingAsc")} className={styles.navLink}>
            Sort Rating Asc
          </button>
        </li>
        <li className={styles.navItem}>
          <button onClick={() => handleSort("RatingDesc")} className={styles.navLink}>
            Sort Rating Desc
          </button>
        </li>
        <li className={styles.navItem}>
          <button onClick={() => handleReset()} className={styles.navLink}>
            All Games
          </button>
        </li>
      </ul>
      <div><SearchBar/></div>
    </nav>
  );
}
