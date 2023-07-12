import { useState } from "react";
import style from "./FormularioEditar.module.css"

function FormularioEditar({settShowForm}) {

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
                    Nuevo userName:
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                </label>
                <label className={style.inputFormu}>
                    Nuevo Email:
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                </label>
                <label className={style.inputFormu}>
                    Nueva Contraseña:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                </label>
                <label className={style.inputFormu}>
                    Contraseña actual:
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}


export default FormularioEditar