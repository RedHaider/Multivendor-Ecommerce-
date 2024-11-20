from rest_framework import serializers
from .models import User , Customer , Vendor
from django.core.exceptions import ValidationError

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)
    photo = serializers.ImageField(required=False, allow_null=True)  # Add photo field
    gender = serializers.ChoiceField(choices=Customer.GENDER_CHOICES, required=False)  # Add gender field

    # Include other Customer fields
    phone = serializers.CharField(required=True)
    address = serializers.CharField(required=False)
    division = serializers.CharField(required=False)
    district = serializers.CharField(required=False)
    state = serializers.CharField(required=False)
    Thana = serializers.CharField(required=False)
    postal_code = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = [
            'email', 'password', 'first_name', 'last_name', 'phone', 'address', 
            'division', 'district', 'state', 'Thana', 'postal_code', 'photo','gender'
        ]

    def validate(self, data):
        if not data.get('email'):
            raise serializers.ValidationError("Email is required")

        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("This email is already registered")

        if not data.get('password'):
            raise serializers.ValidationError("Password is required")

        return data

    def create(self, validated_data):
        photo = validated_data.pop('photo', None)  # Remove photo from data if present
        gender = validated_data.pop('gender', 'others')  # Remove gender from data if provided

        # Create the User instance
        user = User.objects.create_user(
            username=validated_data['email'].split('@')[0],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role='customer',
            phone=validated_data.get('phone', ''),
            address=validated_data.get('address', ''),
            photo=photo , # Assign photo to the user model if provided
            is_active = False,
        )
        

        # Create the Customer associated with the user
        Customer.objects.create(
            user=user,
            phone_number=validated_data.get('phone', ''),
            address=validated_data.get('address', ''),
            division=validated_data.get('division', ''),
            district=validated_data.get('district', ''),
            state=validated_data.get('state', ''),
            Thana=validated_data.get('Thana', ''),
            postal_code=validated_data.get('postal_code', ''),
            gender=validated_data.get('gender', ''),  # Pass the gender value to the Customer instance
        )

        return user



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['name', 'customerID', 'phone_number', 'address', 'division', 'district', 'state', 'Thana', 'postal_code', 'created_at','gender']

class UserSerializer(serializers.ModelSerializer):
    customer_profile = CustomerSerializer(read_only=True)  # Nested customer profile

    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'email', 'phone', 'address', 'role', 'status', 'photo', 'email_verified_at', 'created_at', 'updated_at', 'customer_profile']

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'  

