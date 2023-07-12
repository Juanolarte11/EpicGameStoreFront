// import { auth , provider } from './config'
// import { signInWithPopup } from 'firebase/auth'
// import  style  from '../Login.module.css'
// import axios from 'axios'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

// const ButtonGoogleRegister = ( ) => {

//     const history = useHistory()      
      
//     const handleClick = () => {
//         signInWithPopup(auth,provider).then( async(data) => {    
//             console.log(data);
//                         const value = ({
//                             userName: data.user.displayName,
//                             userPassword: 'firepass',        
//                             userEmail: data.user.email,     
//                             userImage: data.user.photoURL
//                         })                      
//                         const respuestaPost = await axios.post('http://localhost:3001/users/', value)  
//                         console.log(respuestaPost);     
//                     })
//         .catch((error) => {
//             console.error('Error:', error);
//           });
//     }
//   return (
//     <div>
//         <button className={style.buttonGoogle} onClick={handleClick}>Registrar con Google</button>      
//     </div>
//   )
// }

// export default ButtonGoogleRegister