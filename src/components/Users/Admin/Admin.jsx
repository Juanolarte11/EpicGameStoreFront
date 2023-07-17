import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Admin.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios"
import NavBar from "../../NavBar/NavBar";
import ListUsers from "./ListUsers/ListUsers";
import ListVideogames from "./ListVideogames/ListVideogames";
import { getVideogames } from "../../../actions";
import ModalForm from "./modalForm/modalForm";


function Admin() {
    const dispatch = useDispatch()
    const dataUser = JSON.parse(localStorage.getItem("userData"));
    console.log(dataUser);
    const token = JSON.parse(localStorage.getItem("Token"));
    const [edit, setEdit] = useState(false)
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
    const handleModalForm = async () => {
        setEdit(true);
    }
    const handleActiv = async (id) => {

    }
    const handleBam = async (id) => {
        const update = {
            active: false
        }
        try {
            axios.patch(`http://localhost:3001/users/${id}`,update, { headers: {
                    Authorization: `Bearer ${token}`}
            })
            .then((response) => {
                console.log(response);
            })
        } catch (error) {
            console.log(error);
        }
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

    const getDataUsers = async () => {
        console.log(token);
        axios.get("http://localhost:3001/admin/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                setListUsers(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
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
                        <div className={style.contUsers}>
                            <ListUsers lista={listUsers} usuarios={usuariosActivos} boton={handleBam} />
                            <ListUsers lista={usuarios} usuarios={usuariosBaneados} boton={handleActiv} />
                            <ListUsers lista={usuarios} usuarios={solicitudRol} boton={handleAprove} />
                        </div>
                        <div className={style.contVideogames}>
                            <ListVideogames lista={listaVideogames} videogames={videogamesActivos} boton={handleActivVideogame} boton2={handleModalForm} />
                            {edit ? (<ModalForm />) : null}
                            <ListVideogames lista={usuarios} videogames={videogamesInactivos} boton={handleBamVideogame} />
                        </div>
                        <br />
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
