# users/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, WeightEntry, FoodItem, DailyIntake, DailyIntakeEntry

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = UserProfile
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'Las contraseñas no coinciden.'})
        user.set_password(password)
        user.save()
        return user

class WeightEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightEntry
        fields = '__all__'
        read_only_fields = ('user_profile',)

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = '__all__'

class DailyIntakeEntrySerializer(serializers.ModelSerializer):
    food_item = FoodItemSerializer(read_only=True)
    food_item_id = serializers.PrimaryKeyRelatedField(
        queryset=FoodItem.objects.all(), source='food_item', write_only=True
    )
    class Meta:
        model = DailyIntakeEntry
        fields = ['id', 'food_item', 'food_item_id', 'quantity_g']

class DailyIntakeSerializer(serializers.ModelSerializer):
    entries = DailyIntakeEntrySerializer(many=True, read_only=True)
    class Meta:
        model = DailyIntake
        fields = ['id', 'date', 'total_calories', 'total_carbohydrates', 'total_proteins', 'total_fats', 'entries']