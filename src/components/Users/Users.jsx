import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import style from "./Users.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios"
import NavBar from "../NavBar/NavBar";
import style from "./Users.module.css";
import Listado from "./Listado/Listado";
import FormularioEditar from "./FormularioEditar/FormularioEditar";


function User() {
  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const [user, setUser] = useState({})
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState({})
  const [showForm, setShowForm] = useState(false);
  const history = useHistory()
  const settShowForm = ( )=> {
    setShowForm(false)
  }
  const listaDeCompras = [{
    img: "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
    title: "Tomb Raider (2013)",
    precio: 46.9,
  }]

  const getDataUsers = async () => {
    const response = await axios.get(`/users/${dataUser.userID}`)
    const respoCart = await axios.get(`/cart/${dataUser.cartID}`)
    setUser(response.data)
    if(user.role === "cliente"){
      setFavorites(response.data.Videogames)
      setCart(respoCart.data[0].Videogames)
    }
  }

  useEffect(async () => {
    await getDataUsers()
  }, [])

  const btnClick = () => {
    localStorage.setItem("userData", JSON.stringify({}));
    history.push("/home")
  };

  return (
    <div>
      <NavBar />
      {
        <div className={style.user_box}>
        <div className={style.head}>
          <h1>{user.userName}</h1>
          <img src={user.userImage} alt={user.userName} />
          <h2> {user.userEmail} </h2>
          <div>
          <div>
            {showForm ? (<FormularioEditar settShowForm={settShowForm}/>) : (<button onClick={() => {setShowForm(true)}}>Editar Perfil</button>)}
          </div>
            <h1>historial de compras</h1>
            {listaDeCompras.map((ele) => {
              return (
                <div>
                  <h3>{ele.title}</h3>
                  <img src={ele.img} alt={ele.title} key={ele.title} className={style.imageList} />
                  <h3>{ele.precio}</h3>
                </div>
              )
            })}
          </div>
          <button onClick={btnClick}>Cerrar seccion</button>
          <br/>
          <Link to="/home" >
            HOME
          </Link>
        </div>
        <div className={style.list}>
          <div>
            <Listado datos={cart} lista={"Carrito"}/>
          </div>
          <div>
            <Listado datos={favorites} lista={"favoritos"}/>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default User;
