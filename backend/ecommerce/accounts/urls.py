from django.urls import path
from .views import vendor_registration_view, login_view, logout_view, RegisterView, LoginView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
   path('vendor_register/', vendor_registration_view, name='vendor_register'),
   path('', login_view, name='login'),
   path('logout/', logout_view, name='logout'),
    path('customer_register/', RegisterView.as_view(), name='register'),  # Use .as_view() correctly
    path('customer_login/', LoginView.as_view(), name='login'),  # Use .as_view() correctly


]

