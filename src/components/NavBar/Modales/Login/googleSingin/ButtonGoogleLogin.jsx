import { auth , provider } from './config'
import { signInWithPopup } from 'firebase/auth'
import  style  from '../Login.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getDataUser } from '../../../../../actions'



const ButtonGoogleLogin = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleClick = () => {
        signInWithPopup(auth,provider).then( async(data) => {    
            const user = {
                email: data.user.email,
                password: "firepass"
              }
            const response = await axios.post(`/users/emailLogin/${data.user.email}`);
            const dataUser = {
                nombre: response.data.user.userName,
                userID: response.data.user.id,
                cartID: response.data.user.Carrito.id
              }
            const Token = response.data.token
             localStorage.setItem('userData', JSON.stringify(dataUser));
             localStorage.setItem('Token', JSON.stringify(Token));
               dispatch(getDataUser(dataUser))
         }       
        )
    }
  return (
    <div>
        <button className={style.buttonGoogle} onClick={handleClick}>Logear con Google</button>      
    </div>
  )
}

export default ButtonGoogleLogin