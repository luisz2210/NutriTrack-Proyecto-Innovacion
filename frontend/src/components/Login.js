// src/components/Login.js
import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // Importa tu instancia de Axios

function Login({ onLoginSuccess }) { // Recibe una prop para manejar el éxito del login
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await axiosInstance.post('login/', formData);
      console.log('Login exitoso:', response.data);
      const token = response.data.token;
      localStorage.setItem('token', token); // Guarda el token en localStorage
      setMessage('¡Inicio de sesión exitoso!');
      if (onLoginSuccess) {
        onLoginSuccess(token); // Llama a la función de callback
      }
      // Limpiar formulario si es necesario
      setFormData({ username: '', password: '' });
    } catch (err) {
      console.error('Error de login:', err.response ? err.response.data : err.message);
      setError(err.response ? JSON.stringify(err.response.data, null, 2) : 'Error en el inicio de sesión');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && (
        <div>
          <p style={{ color: 'red' }}>Error:</p>
          <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error}</pre>
        </div>
      )}
    </div>
  );
}

export default Login;