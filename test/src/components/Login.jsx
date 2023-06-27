import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí es donde normalmente enviarías los datos a tu servidor
        // para autenticar al usuario.
        console.log(`Usuario: ${username}`);
        console.log(`Contraseña: ${password}`);
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <label>
                    Usuario:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <label>
                    Contraseña:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <input type="submit" value="Iniciar sesión" />
            </form>
        </div>
    );
}

export default Login;
