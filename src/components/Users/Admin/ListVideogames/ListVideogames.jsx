import React, { useEffect } from 'react';
import styles from './Listvideogames.module.css';
import axios from 'axios';


const ListVideogames = ({ lista, boton2, token, updateVidoagames}) => {

  const handleInaVideogame = async (id,status) => {
    
    let state = status

    if(state === "inactive"){
      state = "active"
    }else{
      state = "inactive" 
    }
    const update = {
      active: state
    };
    try {
        axios.patch(`http://localhost:3001/videogames/${id}`, update, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
            });
            updateVidoagames()
    } catch (error) {
        console.log(error);
    }
  };

  
  return (
    <div className={styles.container}>
      <h2>Videogames</h2>
      <ul className={styles.lista}>
        {lista.map((lista) => (
          <li key={lista.id} className={styles.usuario}>
            <div>
              <span>Nombre: {lista.name}</span>
              <span>Price: {lista.price}</span>
              <span>status: {lista.status}</span>
            </div>
            <button className={styles.botonBan} onClick={() => handleInaVideogame(lista.id,lista.status )}>Ban</button>
            <button className={styles.botonBan} onClick={boton2}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListVideogames;