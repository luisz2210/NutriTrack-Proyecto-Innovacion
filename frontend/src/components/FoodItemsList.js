// src/components/FoodItemsList.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const FoodItemsList = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', calories: '', carbohydrates: '', proteins: '', fats: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFoodItems();
    }, []);

    const fetchFoodItems = async () => {
        try {
            const response = await axiosInstance.get('/food_items/');
            setFoodItems(response.data);
            setError(null);
        } catch (err) {
            setError('No se pudieron cargar los alimentos.');
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await axiosInstance.post('/food_items/', newItem);
            setNewItem({ name: '', calories: '', carbohydrates: '', proteins: '', fats: '' });
            fetchFoodItems();
        } catch (err) {
            setError('No se pudo añadir el alimento. Asegúrate de que todos los campos son válidos.');
            console.error(err);
        }
    };

    return (
        <div>
            <h3>Añadir Nuevo Alimento</h3>
            <form onSubmit={handleAddItem} className="add-food-container">
                <input type="text" name="name" value={newItem.name} onChange={handleInputChange} placeholder="Nombre" required />
                <input type="number" name="calories" value={newItem.calories} onChange={handleInputChange} placeholder="Calorías" min="0" required />
                <input type="number" name="carbohydrates" value={newItem.carbohydrates} onChange={handleInputChange} placeholder="Carbohidratos" min="0" required />
                <input type="number" name="proteins" value={newItem.proteins} onChange={handleInputChange} placeholder="Proteínas" min="0" required />
                <input type="number" name="fats" value={newItem.fats} onChange={handleInputChange} placeholder="Grasas" min="0" required />
                <button type="submit">Añadir Alimento</button>
            </form>

            <hr />
            
            <h3>Lista de Alimentos</h3>
            {error && <p className="error">{error}</p>}
            {foodItems.length > 0 ? (
                <ul>
                    {foodItems.map(item => (
                        <li key={item.id}>
                            {item.name} - Calorías: {item.calories.toFixed(2)}, Carbohidratos: {item.carbohydrates.toFixed(2)}g, Proteínas: {item.proteins.toFixed(2)}g, Grasas: {item.fats.toFixed(2)}g
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay alimentos en la lista.</p>
            )}
        </div>
    );
};

export default FoodItemsList;