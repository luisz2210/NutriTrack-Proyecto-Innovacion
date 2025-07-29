from django.contrib import admin
from .models import Meal, MealItem # Esta línea es crucial

# Registra tus modelos aquí
admin.site.register(Meal)
admin.site.register(MealItem)