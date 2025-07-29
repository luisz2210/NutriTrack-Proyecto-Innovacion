# meal_planning/views.py
from rest_framework import viewsets
from .models import Meal, MealItem
from .serializers import MealSerializer, MealItemSerializer

class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

class MealItemViewSet(viewsets.ModelViewSet):
    queryset = MealItem.objects.all()
    serializer_class = MealItemSerializer