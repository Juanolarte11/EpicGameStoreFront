import { auth, provider } from './config'
import { signInWithPopup } from 'firebase/auth'
import style from '../Login.module.css'
import axios from 'axios'

const ButtonGoogleRegister = ({ handleCloseModal }) => {

    const handleClick = () => {

        signInWithPopup(auth, provider).then(async (data) => {
            const response = await axios.get(`/users/emailRegister/${data.user.email}`);
            console.log(response.status);
            if (response.status === 200) {
                const newUserPost = {
                    userName: data.user.displayName,
                    userPassword: "firepass",
                    userEmail: data.user.email,
                };
                try {

                    const respuestaPost = await axios.post('http://localhost:3001/users/', newUserPost)
                    console.log(respuestaPost);
                    handleCloseModal() //para cerrar el modal a la hora de registrar                            
                } catch (error) {
                    console.log(error);
                }
            }

        }
        )
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div>
            <button className={style.buttonGoogle} onClick={handleClick}>Registrar con Google</button>
        </div>
    )
}

export default ButtonGoogleRegister
