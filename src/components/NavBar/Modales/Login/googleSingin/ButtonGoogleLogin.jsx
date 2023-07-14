import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import style from "../Login.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getDataUser } from "../../../../../actions";

const ButtonGoogleLogin = ({ handleCloseLogin }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    signInWithPopup(auth, provider).then(async (data) => {
      const response = await axios.get(
        `http://localhost:3001/users/emailLogin/${data.user.email}`
      );

      const user = response.data;
      if (response.status === 200) {
        const dataUser = {
          nombre: user.userName,
          userID: user.id,
          cartID: user.Carrito.id,
          role: user.role
        };
        console.log(dataUser);
        dispatch(getDataUser(dataUser));
        localStorage.setItem("userData", JSON.stringify(dataUser));
        handleCloseLogin();
        window.location.reload();
      } else {
        alert("No user found...");
      }
    });
  };
  return (
    <div>
      <button className={style.buttonGoogle} onClick={handleClick}>
        Login with Google
      </button>
    </div>
  );
};

export default ButtonGoogleLogin;
