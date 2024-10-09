#accounts/views.py
from django.shortcuts import render,  redirect
from django.contrib.auth.decorators import login_required
from .decorators import check_role
from .models import  User
from django.contrib import messages
from .forms import CustomLoginForm
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer

# Create your views here.

@login_required
@check_role('admin')
def admin_dashboard(request):
    return render(request, 'admin_dashboard.html')

@login_required
@check_role('vendor')
def vendor_dashboard(request):
    return render(request, 'vendor_dashboard.html')

@login_required
@check_role('customer')
def customer_dashboard(request):
    return render(request, 'customer_dashboard.html')



from .forms import UserRegistrationForm, VendorRegistrationForm



#vendor Registration

def vendor_registration_view(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST, request.FILES)
        vendor_form = VendorRegistrationForm(request.POST, request.FILES)

        if user_form.is_valid() and vendor_form.is_valid():
            email = user_form.cleaned_data['email']
            username = email.split('@')[0]  # Default username from email

            # Ensure unique username
            counter = 1
            original_username = username
            while User.objects.filter(username=username).exists():
                username = f"{original_username}{counter}"
                counter += 1

            # Create user but don't save to the database yet
            user = user_form.save(commit=False)
            user.username = username  # Set the unique username
            user.role = 'vendor'  # Ensure the role is set to 'vendor'
            user.set_password(user_form.cleaned_data['password'])  # Set the password
            user.save()

            # Create vendor profile
            vendor = vendor_form.save(commit=False)
            vendor.user = user  # Link vendor to user
            vendor.save()

            messages.success(request, "Vendor registration successful!")
            return redirect('login')  # Replace 'success_url' with your actual success page

    else:
        user_form = UserRegistrationForm()
        vendor_form = VendorRegistrationForm()

    return render(request, 'vendor_registration.html', {'user_form': user_form, 'vendor_form': vendor_form})


#Login
def login_view(request):
    if request.user.is_authenticated:
        if request.user.role == 'vendor':
            return redirect('dashboard') 
        elif request.user.role == 'admin':
            return redirect('dashboard')  # Replace with actual admin dashboard URL
        else:
            return redirect('login') # Block users without vendor or admin role

    if request.method == 'POST':
        form = CustomLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            role = form.cleaned_data.get('role')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                if user.role == role:
                    login(request, user)

                    if role == 'vendor':
                        return redirect('dashboard')
                    elif role == 'admin':
                        return redirect('dashboard')
                    else: 
                        return redirect('dashbaord')
                else: 
                    messages.error(request, "Incorrect role selected")
            else:
                messages.error(request, "Invalid username or Password")
        else:
            messages.error(request, "Invalid form submission")
    else:
        form = CustomLoginForm()
    
    return render(request, 'vendor_login.html', {"form":form})

def logout_view(request):
    # Log out the user by clearing their session
    logout(request)
    
    # Redirect to the login page after logout
    return redirect('login') 


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(request, email=email, password=password)

        # Check if the user exists and has a customer role
        if user is not None:
            if user.role == 'customer':
                # Generate refresh and access tokens
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'role': user.role,
                    'user_id': user.id,
                }, status=status.HTTP_200_OK)
            else:
                # Return an error if the role is not customer
                return Response({"error": "User is not a customer"}, status=status.HTTP_403_FORBIDDEN)

        # Return error if authentication fails
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
