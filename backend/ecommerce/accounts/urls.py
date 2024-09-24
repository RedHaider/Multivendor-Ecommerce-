from django.urls import path
from .views import vendor_registration_view

urlpatterns = [
   path('vendor_register/', vendor_registration_view, name='vendor_register'),
   
]

