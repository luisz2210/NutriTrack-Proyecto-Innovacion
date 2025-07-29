// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import WeightEntry from './components/WeightEntry';
import FoodItemsList from './components/FoodItemsList';
import DailyIntake from './components/DailyIntake';
import axiosInstance from './api/axiosInstance';
import './App.css'; // Asegúrate de que esta línea esté presente

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axiosInstance.get('profile/me/');
      setUserProfile(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      handleLogout();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    }
  }, [fetchUserProfile]);

  const handleLoginSuccess = () => {
    fetchUserProfile();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  return (
    <div id="root">
      <header>
        <h1><span className="app-title">NutriTrack</span></h1>
        {isAuthenticated ? (
          <div>
            <p>Bienvenido, {userProfile?.first_name || userProfile?.user?.username}!</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        ) : (
          <p>Por favor, regístrate o inicia sesión para continuar.</p>
        )}
      </header>

      <main>
        {isAuthenticated ? (
          <> {/* Usamos un Fragmento para agrupar las secciones sin un div extra */}
            <div className="section-container">
              <h2>Datos del perfil</h2>
              {userProfile && (
                <div className="profile-details">
                    <p><strong>Usuario:</strong> {userProfile.user.username}</p>
                    <p><strong>Nombre Completo:</strong> {userProfile.user.first_name} {userProfile.user.last_name}</p>
                    <p><strong>Correo Electrónico:</strong> {userProfile.user.email}</p>
                    {userProfile.gender && <p><strong>Género:</strong> {userProfile.gender}</p>}
                    {userProfile.date_of_birth && <p><strong>Fecha de Nacimiento:</strong> {userProfile.date_of_birth}</p>}
                    {userProfile.height_cm && <p><strong>Altura (cm):</strong> {userProfile.height_cm}</p>}
                    {userProfile.activity_level && <p><strong>Nivel de Actividad:</strong> {userProfile.activity_level}</p>}
                </div>
              )}
            </div>

            <div className="section-container">
              <WeightEntry />
            </div>

            <div className="section-container">
              <FoodItemsList />
            </div>

            <div className="section-container">
              <DailyIntake />
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '20px' }}>
            <Register />
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;