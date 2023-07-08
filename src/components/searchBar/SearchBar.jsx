import React from "react";
import { useState } from "react";
import styles from "./searchBar.module.css";

export default function SearchBar({ handleSearch }) {
  const [name, setName] = useState("");

  async function handleInputChange(e) {
    const name = e.target.value;
    setName(name);

    handleSubmit();
  }
  const handleSubmit = (e) => {
    handleSearch(name);
  };

  return (
    <div className={`${styles.searchBarContainer} searchBarContainer`}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={`${styles.input} input`}
          placeholder="Search..."
          onInput={handleInputChange}
        />
        <button
          type="submit"
          className={`${styles.searchButton} searchButton`}
          onClick={handleSubmit}
        >
          <span className={styles.arrow}>&#10132;</span>
        </button>
      </div>
    </div>
  );
}
