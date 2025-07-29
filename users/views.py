# users/views.py
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from .models import UserProfile, WeightEntry, FoodItem, DailyIntake, DailyIntakeEntry
from .serializers import (
    UserSerializer, UserProfileSerializer, WeightEntrySerializer,
    FoodItemSerializer, DailyIntakeSerializer, RegisterSerializer
)

# Vistas de autenticación y registro
class RegisterView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            
            user_profile = UserProfile.objects.get(user=user)
            profile_serializer = UserProfileSerializer(user_profile)

            return Response({
                "user": UserSerializer(user).data,
                "profile": profile_serializer.data,
                "token": token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "user": UserSerializer(user).data,
                "token": token.key
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)

# Vistas para los ViewSets
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

class CurrentUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(user_profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"detail": "Perfil de usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class WeightEntryViewSet(viewsets.ModelViewSet):
    queryset = WeightEntry.objects.all()
    serializer_class = WeightEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user_profile=self.request.user.userprofile)

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user.userprofile)

class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer
    permission_classes = [permissions.IsAuthenticated]

class DailyIntakeViewSet(viewsets.ModelViewSet):
    queryset = DailyIntake.objects.all()
    serializer_class = DailyIntakeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        date_str = self.request.query_params.get('date')
        if date_str:
            return self.queryset.filter(user_profile=self.request.user.userprofile, date=date_str)
        return self.queryset.filter(user_profile=self.request.user.userprofile)

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user.userprofile)