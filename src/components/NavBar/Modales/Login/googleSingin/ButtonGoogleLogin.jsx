import { auth , provider } from './config'
import { signInWithPopup } from 'firebase/auth'
import  style  from '../Login.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getDataUser } from '../../../../../actions'

const ButtonGoogleLogin = ({handleCloseModal}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleClick = () => {

        signInWithPopup(auth,provider).then( async(data) => {
            const response =  await axios.get(`http://localhost:3001/users/emailLogin/${data.user.email}`);
         
            const user = response.data
            if(response.status === 200){
                const dataUser = {
                    nombre: user.userName,
                    userID: user.id,
                    cartID: user.Carrito.id
                }

                 dispatch(getDataUser(dataUser))
                 localStorage.setItem('userData', JSON.stringify(dataUser));
                 handleCloseModal()
            }else{
                alert('No existe este usuario');
            } 
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