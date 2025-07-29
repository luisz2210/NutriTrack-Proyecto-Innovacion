// src/components/WeightEntry.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

function WeightEntry() {
  const [weightEntries, setWeightEntries] = useState([]);
  const [newWeight, setNewWeight] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeightEntries();
  }, []);

  const fetchWeightEntries = async () => {
    try {
      const response = await axiosInstance.get('weight_entries/');
      setWeightEntries(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weight entries:", err);
      setError("No se pudieron cargar los registros de peso.");
      setLoading(false);
    }
  };

  const handleAddWeight = async (e) => {
    e.preventDefault();
    try {
      // Envía la fecha actual en el formato esperado por Django (YYYY-MM-DD)
      const today = new Date().toISOString().slice(0, 10); 
      await axiosInstance.post('weight_entries/', { weight_kg: newWeight, date: today });
      setNewWeight(''); // Limpiar el campo
      fetchWeightEntries(); // Recargar la lista de registros
    } catch (err) {
      console.error("Error adding weight entry:", err);
      setError("No se pudo añadir el registro de peso.");
    }
  };

  if (loading) return <p>Cargando registros de peso...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Registro de Peso</h2>
      <form onSubmit={handleAddWeight}>
        <input
          type="number"
          step="0.1"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
          placeholder="Ingresa tu peso en kg"
          required
        />
        <button type="submit">Añadir Peso</button>
      </form>

      <h3>Historial de Peso</h3>
      <ul>
        {weightEntries.length > 0 ? (
          weightEntries.map((entry) => (
            <li key={entry.id}>
              Fecha: {entry.date}, Peso: {entry.weight_kg} kg
            </li>
          ))
        ) : (
          <p>No hay registros de peso aún.</p>
        )}
      </ul>
    </div>
  );
}

export default WeightEntry;