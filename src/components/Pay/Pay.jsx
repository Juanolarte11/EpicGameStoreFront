import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "../Pay/Pay.module.css";
import { useHistory } from "react-router-dom";

export const Pay = () => {
  const history = useHistory();

  const dataUser = JSON.parse(localStorage.getItem("userData"));
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");
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
      } else {
        setPayStatus(false);
      }
    } catch (error) {
      console.log("Error en la solicitud:", error);
      setPayStatus(false);
    }
  };

  const handleGoHome = () => {
    history.push("/home");
  };

  useEffect(() => {
    pay();
  }, [status, payStatus]);

  return (
    <div className={style.conteiner}>
      {payStatus === true ? (
        <div className={style.message}>Successful payment!</div>
      ) : payStatus === false ? (
        <div>Pago rechazado</div>
      ) : (
        <div>Procesando el pago...</div>
      )}

      <button className={style.goHomeButton} onClick={handleGoHome}>
        Go Home
      </button>
    </div>
  );
};
