# meal_planning/urls.py
from rest_framework.routers import DefaultRouter
from .views import MealViewSet, MealItemViewSet

router = DefaultRouter()
router.register(r'meals', MealViewSet)
router.register(r'meal_items', MealItemViewSet)

urlpatterns = router.urls