import React from 'react';
import styles from './Navbar.module.css';

export default function Selector({ options, onChange, placeholder }) {
  return (
    <select className={styles.selector} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
