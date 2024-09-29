from django.urls import path
from .views import vendor_registration_view, login_view, logout_view
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
   path('vendor_register/', vendor_registration_view, name='vendor_register'),
   path('', login_view, name='login'),
   path('logout/', logout_view, name='logout'),
   
]

