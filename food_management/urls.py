# food_management/urls.py
from rest_framework.routers import DefaultRouter
from .views import FoodItemViewSet

router = DefaultRouter()
router.register(r'food_items', FoodItemViewSet)

urlpatterns = router.urls