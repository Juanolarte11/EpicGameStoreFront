import React from 'react';
import styles from './Navbar.module.css';
import SearchBar from '../searchBar/SearchBar';
import Selector from './Selecto';
export default function NavbarSec({ handleSort, handleReset, handleSearch }) {
  const options = ["value1", "value2", "value3"]
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarNav}>
        <li className={styles.navItem}>
          <span className={styles.spans}>A-Z</span>
          <button onClick={() => handleSort("AtoZ")} className={styles.navLink}>
          {'\u2191'}
          </button>
        </li>
        <li className={styles.navItem}>
          <button onClick={() => handleSort("ZtoA")} className={styles.navLink}>
          {'\u2193'}
          </button>
        </li>
        <li className={styles.navItem}>
        <span className={styles.spans}>Price</span>
          <button onClick={() => handleSort("PriceAsc")} className={styles.navLink}>
          {'\u2191'}
          </button>
        </li>
        <li className={styles.navItem}>
          <button onClick={() => handleSort("PriceDesc")} className={styles.navLink}>
          {'\u2193'}
          </button>
        </li>
        <li className={styles.navItem}>
        <span className={styles.spans}>Rating</span>
          <button onClick={() => handleSort("RatingAsc")} className={styles.navLink}>
          {'\u2191'}
          </button>
        </li>
        <li className={styles.navItem}>
          <button onClick={() => handleSort("RatingDesc")} className={styles.navLink}>
          {'\u2193'}
          </button>
        </li>
        <li className={styles.navItem}><span className={styles.spans}>Genre</span></li>
        <li className={styles.navItem}>
          <Selector options={options}/>
        </li>
        <li className={styles.navItem}>
          <button onClick={() => handleReset()} className={styles.navLink}>
            All
          </button>
        </li>
        <li className={styles.navItem}>
        <SearchBar handleSearch={handleSearch}/>
        </li>
      </ul>
    </nav>
  );
}


