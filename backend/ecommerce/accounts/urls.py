from django.urls import path
from .views import vendor_registration_view, login_view, logout_view, RegisterView, LoginView ,get_user_details , user_profile , vendor_details, verify_email, VerifyEmailView, PasswordResetConfirmView, PasswordResetRequestView, VendorRegistrationView , VendorLoginView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
   path('vendor_register/', vendor_registration_view, name='vendor_register'),
   path('', login_view, name='login'),
   path('logout/', logout_view, name='logout'),
   path('verify-email/<uidb64>/<token>/', verify_email, name='verify_email'),
   path('customer_register/', RegisterView.as_view(), name='register'),  
   path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify_email'),
   path('customer_login/', LoginView.as_view(), name='login-customer'),  
   path('profile/', user_profile, name='user-profile'),

##########################################################
###################         ##############################
###################  API    ##############################
###################         ##############################
##########################################################
    
    path('api/user/details/', get_user_details, name='user-details'),
    path('api/vendors/<str:id>/', vendor_details, name='vendor-detail'),
    path('api/password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('api/password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),



#flutter
    path('api/vendor-registration/', VendorRegistrationView.as_view(), name='vendor-registration-api'),
     path('api/vendor-login/', VendorLoginView.as_view(), name='login-vendor-api'),
     

]

