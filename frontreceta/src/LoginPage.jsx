import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import backgroundImg from './assets/imagenes/pexels-ella-olsson-1640777.jpg';
import "./style/login.css";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
        };

        try {
            const response = await fetch(`http://localhost:4567/login?username=${userData.username}&password=${userData.password}`, {
                method: 'GET'
            });
        
            if (response.ok) {
                console.log('Inicio de sesión exitoso');
                // Realiza alguna acción, como redirigir a otra página
                navigate('/Home');
            } else {
                console.error('Error al iniciar sesión');
                // Muestra un mensaje de error o maneja el fallo de inicio de sesión
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };
    

    return (
        <div className="login-page">
            <img
                src={backgroundImg}
                className="login-background"
                alt="Imagen de fondo"
                style={{
                    opacity: 0.65,
                }}
            />

            <div className="login-container">
                <h1>Recetario digital</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-form">
                        <TextField
                            label="Nombre de usuario"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            classes={{
                                input: "login-username-field",
                            }}
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            classes={{
                                input: "login-password-field",
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            classes={{
                                button: "login-button",
                            }}
                        >
                            Iniciar sesión
                        </Button>
                    </div>
                </form>

                <p>
                    ¿No estás registrado? <Link to="/RegisterPage" className="login-link">Registrarse</Link>
                </p>
                <p>
                    ¿Olvidaste tu contraseña? <a href="#" className="login-link">Olvídate de mi contraseña</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
