import { useState } from "react";
import style from "./FormularioEditar.module.css"

function FormularioEditar({settShowForm, user}) {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setCurrentPassword('');
        setNewUsername('');
        setNewEmail('');
        setNewPassword('');
        settShowForm()
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label className={style.inputFormu}>
                   Nombre:
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder={user.userName}
                    />
                </label>
                <label htmlFor="">
                    Tu Foto:
                    <img className={style.foto} src="" alt="" placeholder="Tu Foto" />
                </label>
                <label className={style.inputFormu}>
                    Email:
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder={user.userEmail}
                    />
                </label>
                <label className={style.inputFormu}>
                    Rol:
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder={user.role}
                    />
                </label>
                <label className={style.inputFormu}>
                    Region:
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder={"Mexico"}
                    />
                </label>
                <label className={style.inputFormu}>
                    Idioma:
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder={"Español"}
                    />
                </label>
                <span>Quiero Ser Vendedor</span>
                <label className={style.inputFormu}>
                    <button>Solicitar</button>
                </label>
                <span>Cambiar Contraseña</span>
                <label className={style.inputFormu}>
                    Contraseña actual:
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </label>
                <label className={style.inputFormu}>
                    Contraseña nueva:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                </label>
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}


export default FormularioEditar