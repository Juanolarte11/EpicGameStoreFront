import style from "./NavBar.module.css";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import joystick from "./joystick.jpg";
import ModalLogin from "../Login/ModalLogin";
import RegisterLogin from "../Registro/RegisterLogin";
import noUser from "../NavBar/noUser.png";

export default function NavBar({ size }) {
  const dataUser = JSON.parse(localStorage.getItem("userData"));

  const iconUser = dataUser ? dataUser?.nombre?.charAt(0).toUpperCase() : "";

  const btnClick = () => {
    localStorage.setItem("userData", JSON.stringify({}));
    window.location.reload();
  };

  return (
    <nav className={style.nav}>
      {dataUser?.nombre ? (
        <Link to="/users" className={style.userLink}>
          <span className={style.userIcon}>{iconUser}</span>
        </Link>
      ) : (
        <img className={style.userImg} src={noUser} alt="Imagen de perfil" />
      )}
      <h3 className={style.name}>{dataUser?.nombre?.toUpperCase()}</h3>
      <div className={style.navLinks}>
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

          {!dataUser?.userID && <RegisterLogin />}
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
