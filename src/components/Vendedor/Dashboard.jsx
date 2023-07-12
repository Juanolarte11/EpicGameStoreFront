import React from "react";
import { Link } from "react-router-dom";

const DashboardVendedor = () => {
  return (
    <div>
      <ul>
        <li>
          <Link>Mi Perfil</Link>
        </li>

        <li>
          <Link>Mis Juegos</Link>
        </li>

        <li>
          <Link>Ventas</Link>
        </li>

        <li>
          <Link>Clientes</Link>
        </li>

        <li>
          <Link>Estadisticas</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardVendedor;
