import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ConteinerCars from "../ContainerCards/ConteinersCard"
import NavBar from '../NavBar/NavBar';

export const Pay = () => {
    const dataUser = JSON.parse(localStorage.getItem("userData"));
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');
    const [payStatus, setPayStatus] = useState(null);
    const token = JSON.parse(localStorage.getItem("Token"));
    const [allVideogames, setAllVideogames] = useState([])
    const pay = async () => {
        try {
            if (status === "approved") {
                // const response = await axios.post(`http://localhost:3001/pay/successfulPurchase/${dataUser.cartID}`); // Corrijo la URL
                // let newDataUser = {
                //     nombre: dataUser.nombre,
                //     userID: dataUser.userID,
                //     cartID: response.data,
                //     role: dataUser.role,
                //     image: dataUser.image
                // };

                // localStorage.setItem("userData", JSON.stringify(newDataUser));
                setPayStatus(true);
            } else {
                setPayStatus(false);
            }
        } catch (error) {
            console.log("Error en la solicitud:", error);
            setPayStatus(false);
        }
    };
    const getDataUsers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/users/userDetail/${dataUser.userID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAllVideogames(response.data.Videogames)
            console.log(response);
        } catch (error) {
            alert(error.message);
            console.log(error.message);
        }
    };

    const payAprove = async () => {
        let body = {
            cartId: dataUser.cartID,
            userId: dataUser.userID
        }
        try {
            if (payStatus) {
                
                const response = await axios.post("/pay", body)
                let newUser = {
                    cartID : response.data.id,
                    image: dataUser.image,
                    nombre: dataUser.nombre,
                    role: dataUser.role,
                    userID: dataUser.userID,
                }
                localStorage.setItem("userData", JSON.stringify(newUser))
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        pay();
        getDataUsers();
    }, [status, payStatus]);

    return (
        <div>
            <NavBar />
            {payStatus === true ? (
                <div>
                    <div>
                        Pago exitoso
                    </div>
                    <ConteinerCars
                        allVideogames={allVideogames}
                    />
                </div>
            ) : payStatus === false ? (
                <div>
                    Pago rechazado
                </div>
            ) : (
                <div>
                    Procesando el pago...
                </div>
            )}
            <button onClick={payAprove}>pagado</button>
        </div>
    );
};
