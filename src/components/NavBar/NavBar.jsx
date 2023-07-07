import style from "./NavBar.module.css";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import joystick from "./joystick.jpg";
import Favorites from "../Favorites/Favorites";
import { useSelector } from "react-redux";
import ModalLogin from "../Login/ModalLogin";
import RegisterLogin from "../Registro/RegisterLogin";
// import axios from "axios";

export default function NavBar({size}) {
  
  const dataSet = {}
  const userLog = useSelector(state => state.dataUser)
  // localStorage.setItem('userData', JSON.stringify(userLog));
  let userData = {}
  // let userData = JSON.parse(localStorage.getItem("userData"))

  const btnClick = () => {
    // localStorage.setItem("userData",  JSON.stringify(dataSet))
    // window.location.reload()
  }
  return (
    <nav className={style.nav}>
      <img className={style.userImg} src={joystick} alt="Imagen de perfil" />
      <h3 className={style.name}>{userLog?.nombre?.toUpperCase()}</h3>
      <div className={style.navLinks}>
      <div className={style.a}>
        <Link to="/home">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/favorites">FAVOITES</Link>
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
          {
            !userLog.userID &&  
            <ModalLogin/>}
            {            
            }{
            !userLog.userID &&
            <RegisterLogin/>
            }
          {
            userLog.userID &&
            <button onClick={btnClick} className={style.navButton}>Logout</button>
          }
        </div>
      </div>
    </nav>
  );
}
