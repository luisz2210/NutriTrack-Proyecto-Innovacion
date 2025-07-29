from django.db import models

class FoodItem(models.Model):
    name = models.CharField(max_length=200, unique=True)
    # Información nutricional por 100 gramos o porción estándar
    calories = models.DecimalField(max_digits=6, decimal_places=2) # Kcal
    protein = models.DecimalField(max_digits=6, decimal_places=2)  # Gramos
    carbohydrates = models.DecimalField(max_digits=6, decimal_places=2) # Gramos
    fats = models.DecimalField(max_digits=6, decimal_places=2)      # Gramos
    fiber = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True) # Gramos
    sugar = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True) # Gramos
    sodium = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True) # Miligramos

    base_unit = models.CharField(max_length=50, default='grams') # e.g., 'grams', 'ml', 'unit'

    # Campo opcional para una descripción o fuente
    description = models.TextField(blank=True, null=True)

def __str__(self):
        return self.name