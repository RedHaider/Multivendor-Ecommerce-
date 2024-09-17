from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        # Add custom claims
        token['role'] = user.role
        token['user_id'] = user.id  # Assuming 'role' field exists in the User model
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Include role in the response
        data['role'] = self.user.role
        return data
