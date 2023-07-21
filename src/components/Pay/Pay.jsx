import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export const Pay = () => {
    const dataUser = JSON.parse(localStorage.getItem("userData"));
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');
    const [payStatus, setPayStatus] = useState(null);

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
            }
            else if(status === "null"){
                setPayStatus(null);
            } else {
                setPayStatus(false);
            }
        } catch (error) {
            console.log("Error en la solicitud:", error);
            setPayStatus(false);
        }
    };

    useEffect(() => {
        pay();
    }, [status, payStatus]); 

    return (
        <div>
            {payStatus === true ? (
                <div>
                    Pago exitoso
                </div>
            ) : payStatus === false ? (
                <div>
                    Pago rechazado
                </div>
            ) : payStatus === null ? (
                <div>
                    Procesando el pago...
                </div>
            ) : (
                <div>

                </div>
            )}
        </div>
    );
};
