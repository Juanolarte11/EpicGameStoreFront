import { auth , provider } from './config'
import { signInWithPopup } from 'firebase/auth'
import  style  from '../Login.module.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const ButtonGoogleRegister = ({handleCloseModal}) => {

    const history = useHistory()      
      
    const handleClick = () => { 
       
        signInWithPopup(auth,provider).then( async(data) => {    
            const response =  await axios.get('http://localhost:3001/users/')
            const arrayUsers = response.data

            const result = arrayUsers.find( user => user.userEmail === data.user.email)

            if(result){
                alert('ya existe ese usuario') 
                  
            }else{
                history.push("/Home");
                const value = ({
                    userName: data.user.displayName,
                    userPassword: 'firepass',        
                    userEmail: data.user.email,     
                    userImage: data.user.photoURL
                        // data.user.photoURL '               
                        // userProvider: data.user.providerId,
                        // userUid: data.user.uid
                })                
                    try { 
                                              
                        const respuestaPost = await axios.post('http://localhost:3001/users/', value) 
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