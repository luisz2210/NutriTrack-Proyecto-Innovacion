// src/components/DailyIntake.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { format } from 'date-fns';

const DailyIntake = () => {
    const [dailyIntake, setDailyIntake] = useState(null);
    const [foodItemId, setFoodItemId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [entryError, setEntryError] = useState(null);

    const today = format(new Date(), 'yyyy-MM-dd');

    useEffect(() => {
        const fetchDailyIntake = async () => {
            try {
                const response = await axiosInstance.get(`/daily_intake/?date=${today}`);
                setDailyIntake(response.data[0] || null);
            } catch (err) {
                setError("No se pudo cargar la ingesta diaria.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchFoodItems = async () => {
            try {
                const response = await axiosInstance.get('/food_items/');
                setFoodItems(response.data);
            } catch (err) {
                setError("No se pudieron cargar los alimentos.");
                console.error(err);
            }
        };

        fetchDailyIntake();
        fetchFoodItems();
    }, [today]);

    const handleAddEntry = async (e) => {
        e.preventDefault();
        setEntryError(null);

        if (!foodItemId || !quantity) {
            setEntryError("Por favor, selecciona un alimento y la cantidad.");
            return;
        }

        try {
            const foodItem = foodItems.find(item => item.id.toString() === foodItemId);
            if (!dailyIntake) {
                const newIntakeResponse = await axiosInstance.post('/daily_intake/', {
                    date: today,
                    total_calories: (foodItem.calories / 100) * parseFloat(quantity),
                    total_carbohydrates: (foodItem.carbohydrates / 100) * parseFloat(quantity),
                    total_proteins: (foodItem.proteins / 100) * parseFloat(quantity),
                    total_fats: (foodItem.fats / 100) * parseFloat(quantity),
                });
                setDailyIntake(newIntakeResponse.data);
                await axiosInstance.post('/daily_intake_entry/', {
                    daily_intake: newIntakeResponse.data.id,
                    food_item: foodItemId,
                    quantity_g: quantity,
                });
            } else {
                await axiosInstance.post('/daily_intake_entry/', {
                    daily_intake: dailyIntake.id,
                    food_item: foodItemId,
                    quantity_g: quantity,
                });
                const updatedIntakeResponse = await axiosInstance.get(`/daily_intake/${dailyIntake.id}/`);
                setDailyIntake(updatedIntakeResponse.data);
            }

            setFoodItemId('');
            setQuantity('');
        } catch (err) {
            setEntryError("No se pudo añadir la entrada de alimento.");
            console.error("Error al añadir la entrada:", err);
        }
    };

    if (loading) {
        return <p>Cargando ingesta diaria...</p>;
    }

    return (
        <div>
            <h2>Ingesta Diaria</h2>
            {error && <p className="error">{error}</p>}
            
            {dailyIntake ? (
                <>
                    <p>Calorías totales: {dailyIntake.total_calories.toFixed(2)} kcal</p>
                    <p>Carbohidratos totales: {dailyIntake.total_carbohydrates.toFixed(2)} g</p>
                    <p>Proteínas totales: {dailyIntake.total_proteins.toFixed(2)} g</p>
                    <p>Grasas totales: {dailyIntake.total_fats.toFixed(2)} g</p>
                </>
            ) : (
                <p>Aún no hay ingesta diaria para hoy.</p>
            )}

            <h3>Añadir Alimento del Día</h3>
            <form onSubmit={handleAddEntry}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <select value={foodItemId} onChange={e => setFoodItemId(e.target.value)}>
                        <option value="">Selecciona un alimento...</option>
                        {foodItems.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        placeholder="Cantidad en gramos"
                        min="1"
                    />
                    <button type="submit">Añadir</button>
                </div>
            </form>
            {entryError && <p className="error">{entryError}</p>}

            <h3>Comidas del día</h3>
            {dailyIntake && dailyIntake.entries && dailyIntake.entries.length > 0 ? (
                <ul>
                    {dailyIntake.entries.map(entry => (
                        <li key={entry.id}>
                            {entry.food_item.name}: {entry.quantity_g}g
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se han registrado comidas para hoy.</p>
            )}
        </div>
    );
};

export default DailyIntake;