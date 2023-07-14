import React from 'react';
import styles from './ListUsers.module.css';

const ListUsers = ({ lista, usuarios, boton }) => {
  return (
    <div className={styles.container}>
      <h2>{usuarios}</h2>
      <ul className={styles.lista}>
        {lista.map((lista) => (
          <li key={lista.id} className={styles.usuario}>
            <div>
              <span>Nombre: {lista.userName}</span>
              <span>----Rol: {lista.role}</span>
            </div>
            <button className={styles.botonBan} onClick={() => boton(lista.id)}>Ban</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;