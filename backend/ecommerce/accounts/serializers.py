from rest_framework import serializers
from .models import User , Customer
from django.core.exceptions import ValidationError

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name', 'phone', 'address']

    def validate(self, data):
        # Ensure required fields are present
        if not data.get('email'):
            raise serializers.ValidationError("Email is required")

        # Check if the email already exists
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("This email is already registered")

        if not data.get('password'):
            raise serializers.ValidationError("Password is required")

        return data

    def create(self, validated_data):
        # Create the User
        user = User.objects.create_user(
            username=validated_data['email'].split('@')[0],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role='customer',
            phone=validated_data.get('phone', ''),
            address=validated_data.get('address', '')
        )

        # Create the Customer associated with the user
        customer = Customer.objects.create(
            user=user,
            phone_number=validated_data.get('phone', ''),
            address=validated_data.get('address', '')
        )

        return user


