import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import style from "./Users.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios"
import NavBar from "../../NavBar/NavBar";
import ListUsers from "./ListUsers/ListUsers";
import ListVideogames from "./ListVideogames/ListVideogames";
import { getVideogames } from "../../../actions";
// import ModalForm from "./m";


function Admin() {
    const dispatch = useDispatch()
    const dataUser = JSON.parse(localStorage.getItem("userData"));
    const token = JSON.parse(localStorage.getItem("Token"));
    console.log(token);
    // const [edit, setEdit] = useState(false)
    const [user, setUser] = useState({})
    const [listUsers, setListUsers] = useState([])
    const listaVideogames = useSelector((state) => state.videogames);
    const history = useHistory()
    const usuariosActivos = "UsuariosActivos";
    const usuariosBaneados = "UsuariosBaneados";
    const videogamesActivos = "Videogames Activos";
    const videogamesInactivos = "Videogames Inactivos";
    const solicitudRol = "Solicitud De Rol"

    const handleAprove = async (id) => {
        alert("Aprovaste Rol")
    }
    // const handleModalForm = async () => {
    //     setEdit(true);
    // }
    const handleActiv = async (id) => {
        alert("Usuario Activado")
    }
    const handleBam = async (id) => {
        alert("Usuario Desactivado")
    }

    const handleActivVideogame = async (id) => {
        alert("Videogame Activado")
    }
    const handleBamVideogame = async (id) => {
        alert("Videogame Desactivado")
    }

    const usuarios = [
        { id: 1, nombre: 'Usuario 1', rol: 'Admin' },
        { id: 2, nombre: 'Usuario 2', rol: 'Moderador' },
        { id: 3, nombre: 'Usuario 3', rol: 'Invitado' },
    ];
    
    // const config = 
    //   Axios.post( 
    //       'http://localhost:8000/api/v1/get_token_payloads',
    //       config
    //     )
    // const headers =  { authorization: 'Bearer ' + token }
    

    const getDataUsers = async () => {
        // setUser(dataUser);
        // try {
            const response = await axios.get('http://localhost:3001/users',{headers: { Authorization: `Bearer ${token}` }});
            console.log(response.data);
        // } catch (error) {
        //     console.log(error);
        // }
    };
    useEffect(async () => {
        await getDataUsers()
        if (listaVideogames.length === 0) {
            dispatch(getVideogames());
        }
    }, [])

    const btnClick = () => {
        localStorage.setItem("userData", JSON.stringify({}));
        history.push("/home")
    };

    return (
        <div>
            <NavBar />
            {
                <div>
                    <div>
                        <h1>{user.nombre}</h1>
                        <ListUsers lista={usuarios} usuarios={usuariosActivos} boton={handleBam} />
                        <ListUsers lista={usuarios} usuarios={usuariosBaneados} boton={handleActiv} />
                        <ListUsers lista={usuarios} usuarios={solicitudRol} boton={handleAprove} />
                        {/* <ListVideogames lista={listaVideogames} videogames={videogamesActivos} boton={handleActivVideogame} boton2={handleModalForm}/>
                        {edit ? (<ModalForm />) : null} */}
                        <ListVideogames lista={usuarios} videogames={videogamesInactivos} boton={handleBamVideogame} />
                        <button onClick={btnClick}>Cerrar seccion</button>
                        <br />
                        <Link to="/home" >
                            HOME
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
}

export default Admin;
