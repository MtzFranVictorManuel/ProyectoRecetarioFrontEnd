// App.jsx
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Home from './Home'; // Importa el componente Home
import './style/login.css';

const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLogged ? <Home handleLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/Home" element={<Home handleLogout={handleLogout} />} />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById('root')).render(<App />);
