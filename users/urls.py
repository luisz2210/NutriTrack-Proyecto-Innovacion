# users/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# Importa tus ViewSets existentes y las nuevas vistas de autenticación
from .views import (
    UserViewSet, UserProfileViewSet, WeightEntryViewSet,
    RegisterView, LoginView, CurrentUserProfileView # <-- ¡Importa estas nuevas vistas!
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', UserProfileViewSet)
router.register(r'weight_entries', WeightEntryViewSet)

urlpatterns = [
    # Nuevas rutas para autenticación y perfil del usuario actual
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/me/', CurrentUserProfileView.as_view(), name='current-user-profile'), # Para obtener el perfil del usuario logueado
]

# Incluye las URLs generadas por el router al final
urlpatterns += router.urls