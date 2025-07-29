// src/components/Register.js
import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // Importa tu instancia de Axios

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    first_name: '',
    last_name: '',
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
      const response = await axiosInstance.post('register/', formData);
      console.log('Registro exitoso:', response.data);
      setMessage('¡Registro exitoso! Ya puedes iniciar sesión.');
      // Puedes limpiar el formulario o redirigir al usuario
      setFormData({
        username: '',
        password: '',
        password2: '',
        email: '',
        first_name: '',
        last_name: '',
      });
    } catch (err) {
      console.error('Error de registro:', err.response ? err.response.data : err.message);
      setError(err.response ? JSON.stringify(err.response.data, null, 2) : 'Error en el registro');
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Repetir Contraseña:</label>
          <input type="password" name="password2" value={formData.password2} onChange={handleChange} required />
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        </div>
        <button type="submit">Registrarse</button>
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

export default Register;