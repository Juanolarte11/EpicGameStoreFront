import React from 'react';
import styles from './Listvideogames.module.css';

const ListVideogames = ({ lista, videogames, boton}) => {
  return (
    <div className={styles.container}>
      <h2>{videogames}</h2>
      <ul className={styles.lista}>
        {lista.map((lista) => (
          <li key={lista.id} className={styles.usuario}>
            <div>
              <span>Nombre: {lista.name}</span>
              <span>Price: {lista.price}</span>
            </div>
            <button className={styles.botonBan} onClick={boton}>Ban</button>
            {/* <button className={styles.botonBan} onClick={b}>Edit</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListVideogames;