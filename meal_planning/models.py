from django.db import models
from django.contrib.auth.models import User
from food_management.models import FoodItem # Importa FoodItem desde la otra app

class Meal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='meals')
    date = models.DateField()
    MEAL_TYPE_CHOICES = [
        ('breakfast', 'Desayuno'),
        ('lunch', 'Almuerzo'),
        ('dinner', 'Cena'),
        ('snack', 'Snack'),
        ('other', 'Otro'),
    ]
    meal_type = models.CharField(max_length=20, choices=MEAL_TYPE_CHOICES)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('user', 'date', 'meal_type')
        ordering = ['-date', 'meal_type']

    def __str__(self):
        return f"{self.user.username}'s {self.meal_type} on {self.date}"

class MealItem(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, related_name='items')
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=6, decimal_places=2)
    unit = models.CharField(max_length=50, default='grams')

    def __str__(self):
        return f"{self.quantity} {self.unit} de {self.food_item.name}"