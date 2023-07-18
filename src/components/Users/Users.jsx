<<<<<<< HEAD
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useHistory } from "react-router-dom";
// import axios from "axios"
// import NavBar from "../NavBar/NavBar";
// import style from "./Users.module.css";
// import Listado from "./Listado/Listado";
// import FormularioEditar from "./FormularioEditar/FormularioEditar";

// function User() {
//   const dataUser = JSON.parse(localStorage.getItem("userData"));
//   const [user, setUser] = useState({})
//   const [cart, setCart] = useState([])
//   const [favorites, setFavorites] = useState({})
//   const [showForm, setShowForm] = useState(false);
//   const history = useHistory()
//   const settShowForm = ( )=> {
//     setShowForm(false)
//   }
//   const listaDeCompras = [{
//     img: "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
//     title: "Tomb Raider (2013)",
//     precio: 46.9,
//   }]

//   const getDataUsers = async () => {
//     try {
//       const response = await axios.get(`/users/${dataUser.userID}`)
//       const respoCart = await axios.get(`/cart/${dataUser.cartID}`)
//         setUser(response.data)
//       if(user.role === "cliente"){
//         setFavorites(response.data.Videogames)
//         setCart(respoCart.data[0].Videogames)
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(async () => {
//       getDataUsers()
//   }, [])

//   const btnClick = () => {
//     localStorage.setItem("userData", JSON.stringify({}));
//     history.push("/home")
//   };

//   return (
//     <div>
//       <NavBar />
//       {
//         <div className={style.user_box}>
//         <div className={style.head}>
//           <h1>{user.userName}</h1>
//           <img src={user.userImage} alt={user.userName} />
//           <h2> {user.userEmail} </h2>
//           <div>
//           <div>
//             {showForm ? (<FormularioEditar settShowForm={settShowForm}/>) : (<button onClick={() => {setShowForm(true)}}>Editar Perfil</button>)}
//           </div>
//             <h1>historial de compras</h1>
//             {listaDeCompras.map((ele) => {
//               return (
//                 <div>
//                   <h3>{ele.title}</h3>
//                   <img src={ele.img} alt={ele.title} key={ele.title} className={style.imageList} />
//                   <h3>{ele.precio}</h3>
//                 </div>
//               )
//             })}
//           </div>
//           <button onClick={btnClick}>Cerrar seccion</button>
//           <br/>
//           <Link to="/home" >
//             HOME
//           </Link>
//         </div>
//         <div className={style.list}>
//           <div>
//             <Listado datos={cart} lista={"Carrito"}/>
//           </div>
//           <div>
//             <Listado datos={favorites} lista={"favoritos"}/>
//           </div>
//         </div>
//       </div>
//       }
//     </div>
//   );
// }

// export default User;

=======
>>>>>>> b419a1f272f56b4d3fb82c75da888ee8d99c2bb8
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import styles from "./Users.module.css";
import Listado from "./Listado/Listado";
import FormularioEditar from "./FormularioEditar/FormularioEditar";

function User() {
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [showForm, setShowForm] = useState(false);
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("Token"));
  
  const settShowForm = () => {
    setShowForm(true);
  };

  const listaDeCompras = [
    {
      img: "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
      title: "Tomb Raider (2013)",
      precio: 46.9,
    },
  ];

  const getDataUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/userDetail/${dataUser.userID}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      const respoCart = await axios.get(`/cart/${dataUser.cartID}`);
      setUser(response.data);
      if (response.data.role === "cliente") {
        setFavorites(response.data.Videogames);
        setCart(respoCart.data[0].Videogames);
      }
    } catch (error) {
      alert(error.message)
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataUsers();
  }, []);

<<<<<<< HEAD
=======


>>>>>>> b419a1f272f56b4d3fb82c75da888ee8d99c2bb8
  return (
    <div className={styles.container}>
      <NavBar />
      {user && (
        <div className={styles.user_box}>
          <div className={styles.head}>
            <div className={styles.contForm}>
              <FormularioEditar settShowForm={settShowForm} user={user} />
<<<<<<< HEAD
            </div>
            <div id="modal-root"></div>
            <div className={styles.actions}>
              <h1 className={styles.sectionTitle}>My Shopping</h1>
              {listaDeCompras.map((ele) => {
                return (
                  <div key={ele.title} className={styles.compra}>
                    <h3>{ele.title}</h3>
                    <img
                      src={ele.img}
                      alt={ele.title}
                      className={styles.imageList}
                    />
                    <h3>{ele.precio}</h3>
                  </div>
                );
              })}
=======
>>>>>>> b419a1f272f56b4d3fb82c75da888ee8d99c2bb8
            </div>
            
          </div>
<<<<<<< HEAD
          <div className={styles.list}>
            <div>
              <Listado datos={cart} lista={"Cart"} />
            </div>
            <div>
              <Listado datos={favorites} lista={"Favorites"} />
=======
          <div id="modal-root"></div>
            <div className={styles.list}>
              <div>
                <Listado datos={cart} lista={"Carrito"} />
              </div>
              <div>
                <Listado datos={favorites} lista={"Favoritos"} />
              </div>
>>>>>>> b419a1f272f56b4d3fb82c75da888ee8d99c2bb8
            </div>
          <div className={styles.actions}>
            <h1 className={styles.sectionTitle}>Historial de Compras</h1>
            {listaDeCompras.map((ele) => {
              return (
                <div key={ele.title} className={styles.compra}>
                  <img
                    src={ele.img}
                    alt={ele.title}
                    className={styles.imageList}
                  />
                  <h3>{ele.title}</h3>
                  <button className={styles.ver}>Ver Juego</button>
                  <h3>{ele.precio}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
