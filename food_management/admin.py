from django.contrib import admin
from .models import FoodItem # Importa tu modelo FoodItem

# Registra tu modelo aquí
admin.site.register(FoodItem)