# food_management/views.py
from rest_framework import viewsets
from .models import FoodItem
from .serializers import FoodItemSerializer

class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer