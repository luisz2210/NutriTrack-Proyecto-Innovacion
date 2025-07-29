// frontend/src/components/MealPlan.js
import React, { useState, useEffect } from 'react';

function MealPlan() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // En este punto, solo haremos una solicitud GET para ver las comidas existentes.
  // Más adelante añadiremos la funcionalidad para añadir y editar comidas.
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // Asegúrate de que tu servidor Django esté corriendo en http://localhost:8000
        const response = await fetch('http://localhost:8000/api/meals/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMeals(data); // Guarda los datos de las comidas en el estado
      } catch (error) {
        console.error("Error fetching meals:", error);
        setError(error); // Guarda el error en el estado
      } finally {
        setLoading(false); // Indica que la carga ha terminado
      }
    };

    fetchMeals(); // Llama a la función para cargar las comidas cuando el componente se monta
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar


  if (loading) {
    return <div>Cargando planes de comidas...</div>;
  }

  if (error) {
    return <div>Error al cargar comidas: {error.message}</div>;
  }

  return (
    <div>
      <h2>Mi Plan de Comidas</h2>
      {meals.length > 0 ? (
        <ul>
          {meals.map(meal => (
            <li key={meal.id}>
              <strong>{meal.date}</strong> - {meal.meal_type}: {meal.notes || "Sin notas"}
              {/* Aquí podríamos mostrar los MealItems, pero lo haremos en un paso posterior */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aún no tienes comidas registradas. ¡Empieza a planificar!</p>
      )}
    </div>
  );
}

export default MealPlan;