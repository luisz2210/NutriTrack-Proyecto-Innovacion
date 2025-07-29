// frontend/src/components/UserProfile.js
import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [weightEntries, setWeightEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch User Profile (asumimos que el primer perfil es el que queremos mostrar por ahora)
        const profileResponse = await fetch('http://localhost:8000/api/profiles/');
        if (!profileResponse.ok) {
          throw new Error(`HTTP error! status: ${profileResponse.status}`);
        }
        const profiles = await profileResponse.json();
        if (profiles.length > 0) {
          setUserProfile(profiles[0]); // Tomamos el primer perfil encontrado
        } else {
          setUserProfile(null); // No hay perfiles
        }

        // Fetch Weight Entries
        const weightResponse = await fetch('http://localhost:8000/api/weight_entries/');
        if (!weightResponse.ok) {
          throw new Error(`HTTP error! status: ${weightResponse.status}`);
        }
        const weights = await weightResponse.json();
        setWeightEntries(weights);

      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando perfil de usuario...</div>;
  }

  if (error) {
    return <div>Error al cargar el perfil: {error.message}</div>;
  }

  return (
    <div>
      <h2>Mi Perfil</h2>
      {userProfile ? (
        <div>
          <p><strong>Usuario:</strong> {userProfile.user.username}</p>
          <p><strong>Género:</strong> {userProfile.gender}</p>
          <p><strong>Fecha de Nacimiento:</strong> {userProfile.date_of_birth}</p>
          <p><strong>Altura (cm):</strong> {userProfile.height_cm}</p>
          <p><strong>Nivel de Actividad:</strong> {userProfile.activity_level}</p>
          <p><strong>Objetivo:</strong> {userProfile.goal}</p>
        </div>
      ) : (
        <p>No se encontró un perfil de usuario. Asegúrate de haber creado uno en el panel de administración de Django.</p>
      )}

      <h3>Mis Registros de Peso</h3>
      {weightEntries.length > 0 ? (
        <ul>
          {weightEntries.map(entry => (
            <li key={entry.id}>
              {entry.date}: {entry.weight_kg} kg
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay registros de peso. ¡Añade algunos!</p>
      )}
    </div>
  );
}

export default UserProfile;