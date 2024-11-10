from django.urls import path
from .views import vendor_registration_view, login_view, logout_view, RegisterView, LoginView ,get_user_details , user_profile
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
   path('vendor_register/', vendor_registration_view, name='vendor_register'),
   path('', login_view, name='login'),
   path('logout/', logout_view, name='logout'),
   path('customer_register/', RegisterView.as_view(), name='register'),  
   path('customer_login/', LoginView.as_view(), name='login-customer'),  
   path('vendor/profile/', user_profile, name='user-profile'),

##########################################################
###################         ##############################
###################  API    ##############################
###################         ##############################
##########################################################
    
    path('api/user/details/', get_user_details, name='user-details'),


]

