import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Admin.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "../../NavBar/NavBar";
import ListUsers from "./ListUsers/ListUsers";
import ListVideogames from "./ListVideogames/ListVideogames";
import { getVideogames, getUsersAct } from "../../../actions";


function Admin() {
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("Token"));
    const [acti, setActivos] = useState(null);
    const [user, setUser] = useState({});
    const [listGames, setListGames] = useState([])
    const [listUsersAct, setListUsers] = useState([]);
    const listaUserFil = useSelector((state) => state.usersFiltra);
    const [listaVideogames, setListaVideogames] = useState([]);
    const history = useHistory();
    const [selectedRole, setSelectedRole] = useState("");


    useEffect(() => {
        if (acti === null) {
            return;
        }

        if (acti === "All") {
            console.log("todos los usuarios");
            getDataUsers();
        } else {
            dispatch(getUsersAct(acti));
            setListUsers(listaUserFil);
        }
    }, [acti]);

    const handleBamUser = async (id, isActive) => {
        const update = {
            active: !isActive,
        };
        try {
            axios.patch(`http://localhost:3001/users/${id}`, update, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    console.log(response);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditRole = async (e, id) => {
        const update = {
            role: e.target.value,
        };
        try {
            axios.patch(`http://localhost:3001/users/${id}`, update, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    console.log(response);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getListVideogame = async () => {
        axios.get("http://localhost:3001/admin/videogames", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setListaVideogames(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDataUsers = async () => {
        axios.get("http://localhost:3001/admin/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setListUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getUsersAct(true));
            await getDataUsers();
            await getListVideogame();
            if (listaVideogames.length === 0) {
                dispatch(getVideogames());
            }
        };
        console.log("hola");
        fetchData();
    }, []);

    useEffect(() => {
        setListGames(listaVideogames);
        console.log(listGames);
    }, [listaVideogames]);


    const btnClick = () => {
        localStorage.setItem("userData", JSON.stringify({}));
        history.push("/home");
    };

    const handleUsuariosAct = () => {
        setActivos(true);
        setListUsers(listaUserFil);
    };

    const handleUsuariosDes = () => {
        setActivos(false);
        setListUsers(listaUserFil);
    };

    const handleRoleChange = async (e) => {
        axios.get(`http://localhost:3001/admin/users?role=${e.target.value}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                setListUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setSelectedRole(e.target.value);
    };

    const filterListVideogamesAct = () => {
        const newList = listaVideogames.filter((game) => game.status === "active")
        setListGames(newList)
    }

    const filterListVideogamesInac = () => {
        const newList = listaVideogames.filter((game) => game.status === "inactive")
        setListGames(newList)
    }

    const filterListVideogamesAll = () => {
        const newList = listaVideogames
        setListGames(newList)
    }

    return (
        <div>
            <NavBar />
            {
                <div>
                    <div className={style.container}>
                        {/* <-----------------------------------------------------------------------------------usuarios------------------------------------------------->                         */}
                        <div className={style.containerUsers}>
                            <div className={style.filtreusers} style={{ marginBottom: "10px" }}>
                                <button className={style.button} onClick={handleUsuariosAct}>
                                    usuariosAct
                                </button>
                                <button className={style.button} onClick={handleUsuariosDes}>
                                    usuariosDes
                                </button>
                                <button
                                    className={style.button}
                                    onClick={() => setActivos("All")}
                                >
                                    todos
                                </button>
                                <select
                                    className={style.select}
                                    onChange={handleRoleChange}
                                    value={selectedRole}
                                >
                                    <option value="">ALL</option>
                                    <option value="vendedor">Vendedor</option>
                                    <option value="cliente">Cliente</option>
                                </select>
                            </div>
                            <div className={style.user}>
                                <h1 className={style.title}>{user.nombre}</h1>
                                <div className={style.listContainer}>
                                    <ListUsers
                                        lista={listUsersAct}
                                        boton={handleBamUser}
                                        handleEditRole={handleEditRole}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <----------------------------------------------------------------------------- Videogames ------------------------------------------------------------->                         */}
                        <div className={style.videogamesContainer}>
                            <button className={style.button} onClick={() => filterListVideogamesAct()}>
                                VideogamesAct
                            </button>
                            <button className={style.button} onClick={() => filterListVideogamesInac()}>
                                VideogamesDes
                            </button>
                            <button className={style.button} onClick={() => filterListVideogamesAll()}>
                                All
                            </button>
                            <ListVideogames
                                lista={listGames}
                                token={token}
                                getListVideogame={getListVideogame}
                            />
                        </div>
                        <div className={style.buttonContainer}>
                            <button className={style.button} onClick={btnClick}>
                                Cerrar sesión
                            </button>
                            <br />
                            <Link to="/home" className={style.link}>
                                HOME
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}

export default Admin;
