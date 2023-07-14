import style from "./NavBar.module.css";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import UserModal from "./Modales/Users/UserModal";
import ModalLogin from "./Modales/Login/ModalLogin";
import ModalRegister from "./Modales/Registro/ModalRegister";
import noUser from "../NavBar/noUser2.png";

export default function NavBar({ size }) {
  const dataUser = JSON.parse(localStorage.getItem("userData"));

  const btnClick = () => {
    localStorage.setItem("userData", JSON.stringify({}));
    window.location.reload();
  };

  const handleOpenModalLogin = ModalLogin.handleOpenModalLogin;

  return (
    <nav className={style.nav}>
      {dataUser?.nombre ? (
        <UserModal></UserModal>
      ) : (
        <div>
          <img className={style.userImg} src={noUser} alt="Imagen de perfil" />
        </div>
      )}
      <div className={style.navLinks}>
        <div className={style.nameContainer}>
          <h3 className={style.name}>{dataUser?.nombre?.toUpperCase()}</h3>
        </div>
        <div className={style.a}>
          <Link to="/home">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/favorites">FAVORITES</Link>
        </div>
        <IconButton aria-label="mostrar items" color="inherit">
          <Badge badgeContent={size} color="secondary">
            <Link to="/cart">
              <ShoppingCartIcon fontSize="large" color="inherit" />
            </Link>
          </Badge>
        </IconButton>
      </div>

      <div>
        <div className={style.navButtons}>
          {!dataUser?.userID && <ModalLogin />}

          {!dataUser?.userID && (
            <ModalRegister handleOpenModalLogin={handleOpenModalLogin} />
          )}
          {dataUser?.userID && (
            <button onClick={btnClick} className={style.navButton}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
