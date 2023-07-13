import style from "./Listado.module.css"
import { Link } from "react-router-dom"

function Listado({datos,lista}) {
    let url = ""
    let newDatos = [];
    let contador = 0;
    if(lista === "Carrito"){
        url = "/cart";
    }else{
        url = "/favorites"
    }
    if(datos.length > 3){
        newDatos = datos.slice(0, 10)
    }else{
        newDatos = datos
    }

    return (
        <div className={style.body}>
            {datos.length && newDatos.map((juego) => {
                return (
                    <div>
                        <h3>{juego.title}</h3>
                        <img src={juego.image} alt={juego.title} key={juego.title} className={style.image}/>
                    </div>
                )
            })}
            <Link to={url} className={style.url}>
                <p className={style.boton}>{lista}</p>
            </Link>
        </div>
    )
}

export default Listado