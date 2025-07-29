from django.contrib import admin
from .models import UserProfile, WeightEntry # Importa tus modelos

# Registra tus modelos aquí
admin.site.register(UserProfile)
admin.site.register(WeightEntry)