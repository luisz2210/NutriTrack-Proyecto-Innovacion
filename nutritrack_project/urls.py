# nutritrack_project/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import (
    RegisterView, LoginView, ProfileViewSet,
    WeightEntryViewSet, FoodItemViewSet, DailyIntakeViewSet, CurrentUserProfileView
)

router = DefaultRouter()
router.register(r'profile', ProfileViewSet)
router.register(r'weight_entries', WeightEntryViewSet)
router.register(r'food_items', FoodItemViewSet)
router.register(r'daily_intake', DailyIntakeViewSet, basename='daily_intake')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/profile/me/', CurrentUserProfileView.as_view(), name='current-user-profile'),
    path('api/', include(router.urls)),
]