import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import "./style/register.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surnames, setSurnames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los datos ingresados
    if (!email.includes("@")) {
      alert("El correo electrónico no es válido");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Enviar los datos al servidor
    // ...
  };

  return (
    <div className="register-page">
      <h1>Registrarse</h1>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de usuario"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Nombre o nombres"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Apellidos"
          type="text"
          value={surnames}
          onChange={(e) => setSurnames(e.target.value)}
        />
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirmar contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
        >
          Registrarse
        </Button>
      </form>

      <p>
        ¿Ya tienes una cuenta? <Link to="/" className="login-link">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
