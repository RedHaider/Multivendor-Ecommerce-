#accounts/views.py
from django.shortcuts import render,  redirect
from django.contrib.auth.decorators import login_required
from .decorators import check_role
from .models import  User, Vendor , Admin
from django.contrib import messages
from .forms import CustomLoginForm
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.template.loader import render_to_string
from django.utils.encoding import force_str

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
            user.is_active = False  # User account inactive until email verification
            user.set_password(user_form.cleaned_data['password'])  # Set the password
            user.save()

            # Create vendor profile
            vendor = vendor_form.save(commit=False)
            vendor.user = user  # Link vendor to user
            vendor.save()

            # Send verification email
            send_verification_email(request, user)

            messages.success(request, "Vendor registration successful! Please check your email to verify your account.")
            return redirect('login')  # Redirect to login after successful registration

    else:
        user_form = UserRegistrationForm()
        vendor_form = VendorRegistrationForm()

    return render(request, 'vendor_registration.html', {'user_form': user_form, 'vendor_form': vendor_form})

def send_verification_email(request, user):
    subject = "Verify Your Email"
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    verification_link = request.build_absolute_uri(
        reverse('verify_email', kwargs={'uidb64': uid, 'token': token})
    )
    message = render_to_string('registration/verify_email.html', {'link': verification_link, 'user': user})
    send_mail(subject, message, None, [user.email])  # None uses DEFAULT_FROM_EMAIL

def verify_email(request, uidb64, token):
    try:
        uid = force_bytes(urlsafe_base64_decode(uidb64)).decode()
        user = get_object_or_404(User, pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)  # Log in the user after successful verification
        messages.success(request, "Your email has been verified. You are now logged in.")
        return redirect('dashboard')  # Redirect to the dashboard or another page
    else:
        messages.error(request, "The verification link is invalid or has expired.")
        return render(request, 'registration/email_verification_failed.html')

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

#user profile
@login_required
def user_profile(request):
    user = request.user
    if user.role == 'vendor':
        # Fetch the vendor profile associated with this user
        vendor = get_object_or_404(Vendor, user=user)
        return render(request, 'pages/user-vendor.html', {'vendor': vendor})  # Context must be a dictionary
    
    elif user.role =='admin':
        return render(request, 'pages/user-admin.html', {'user':user})
    
    else:
        # Redirect or display error if user is not a vendor
        return render(request,  {'message': 'Access Denied: You are not authorized to view this page.'})

##########################################################
###################         ##############################
###################  API    ##############################
###################         ##############################
##########################################################

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer, VendorSerializer
from django.conf import settings 

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            # Save the user as inactive
            user = serializer.save(is_active=False)

            # Generate email verification token and link
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))  # Correct encoding
            verification_link = f"{settings.FRONTEND_BASE_URL}/verify-email/{uid}/{token}"

            # Send verification email
            send_mail(
                subject="Verify Your Email",
                message=f"Click the link to verify your email: {verification_link}",
                from_email=None,  # Use DEFAULT_FROM_EMAIL in settings.py
                recipient_list=[user.email],
            )

            return Response(
                {"message": "User registered successfully. Check your email to verify your account."},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    def get(self, request, uidb64, token):
        try:
            # Decode the uid
            uid = force_str(urlsafe_base64_decode(uidb64))  # Decode to string
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Invalid link"}, status=status.HTTP_400_BAD_REQUEST)

        # Check the token
        if default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({"message": "Email successfully verified"}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(request, email=email, password=password)

        if user is not None:
            # Check if the user is active
            if not user.is_active:
                return Response(
                    {"error": "Account is not verified. Please check your email to activate your account."},
                    status=status.HTTP_403_FORBIDDEN
                )
            

            # Check if the user has a customer role
            if user.role == 'customer':
                # Generate refresh and access tokens
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'role': user.role,
                    'user_id': user.id,
                }, status=status.HTTP_200_OK)

            # Return an error if the role is not customer
            return Response({"error": "User is not a customer"}, status=status.HTTP_403_FORBIDDEN)

        # Return error if authentication fails
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensures only authenticated users can access this view
def get_user_details(request):
    user = request.user

    # Debugging to see what is coming from the frontend
    print("Request Method:", request.method)  # Print the method used (should be GET)
    print("Authenticated User:", user)  # Print the user object
    print("Query Params:", request.query_params)  # Print any query parameters if present

    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
def vendor_details(request, id):
    try:
        vendor = Vendor.objects.get(id=id)  # Fixed typo: Vendor.objects.get
        serializer = VendorSerializer(vendor)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Vendor.DoesNotExist:
        return Response({"error": "Vendor not found"}, status=status.HTTP_404_NOT_FOUND)


##Password Reset
User = get_user_model()

class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            # Generate frontend link
            reset_link = f"{settings.FRONTEND_BASE_URL}/reset-password/{uid}/{token}/"

            # Send email
            send_mail(
                subject="Reset Your Password",
                message=f"Click the link to reset your password: {reset_link}",
                from_email=None,
                recipient_list=[user.email],
            )

            return Response({"message": "Password reset email sent. Please check your inbox."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Email not found"}, status=status.HTTP_404_NOT_FOUND)

class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Invalid or expired link"}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

        new_password = request.data.get('password')
        if not new_password:
            return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"message": "Password has been reset successfully"}, status=status.HTTP_200_OK)