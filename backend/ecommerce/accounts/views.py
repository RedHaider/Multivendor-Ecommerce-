#accounts/views.py
from django.shortcuts import render,  redirect
from django.contrib.auth.decorators import login_required
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework.response import Response
# Create your views here.

@login_required
def admin_dashboard(request):
    if request.user.role != 'admin':
        return redirect('home') 
    return render(request, 'index.html')

@login_required
def vendor_dashboard(request):
    if request.user.role != 'vendor':
        return redirect('home')
    return render(request, 'index.html')



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = self.get_token(user)

        # Return token and user info
        return Response({
            'refresh': str(token),
            'access': str(token.access_token),
            'role': user.role,
            'user_id': user.id
        })
