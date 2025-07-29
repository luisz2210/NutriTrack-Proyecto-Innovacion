# users/models.py
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from datetime import date

# Modelo para el perfil del usuario
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Otros campos del perfil...
    gender = models.CharField(max_length=10, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    height_cm = models.FloatField(blank=True, null=True)
    activity_level = models.CharField(max_length=50, blank=True, null=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()

# Modelo para el registro de peso
class WeightEntry(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    weight_kg = models.FloatField()
    date = models.DateField(default=date.today)

    def __str__(self):
        return f"{self.user_profile.user.username} - {self.weight_kg} kg ({self.date})"

# Modelo para los alimentos
class FoodItem(models.Model):
    name = models.CharField(max_length=255)
    calories = models.FloatField()
    carbohydrates = models.FloatField(blank=True, null=True)
    proteins = models.FloatField(blank=True, null=True)
    fats = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.name

# Modelo para un registro de ingesta diaria
class DailyIntake(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    date = models.DateField(default=date.today)
    total_calories = models.FloatField(default=0.0)
    total_carbohydrates = models.FloatField(default=0.0)
    total_proteins = models.FloatField(default=0.0)
    total_fats = models.FloatField(default=0.0)

    class Meta:
        unique_together = ('user_profile', 'date')

    def __str__(self):
        return f"Daily Intake for {self.user_profile.user.username} on {self.date}"

# Modelo para cada entrada de alimento en un registro diario
class DailyIntakeEntry(models.Model):
    daily_intake = models.ForeignKey(DailyIntake, on_delete=models.CASCADE, related_name='entries')
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    quantity_g = models.FloatField() # Cantidad en gramos

    def __str__(self):
        return f"{self.food_item.name} - {self.quantity_g}g"