# meal_planning/serializers.py
from rest_framework import serializers
from .models import Meal, MealItem
from food_management.serializers import FoodItemSerializer # Importa el serializador de FoodItem

class MealItemSerializer(serializers.ModelSerializer):
    food_item = FoodItemSerializer(read_only=True) # Para ver los detalles del alimento

    class Meta:
        model = MealItem
        fields = '__all__'

class MealSerializer(serializers.ModelSerializer):
    items = MealItemSerializer(many=True, read_only=True) # Para ver los items dentro de la comida

    class Meta:
        model = Meal
        fields = '__all__'