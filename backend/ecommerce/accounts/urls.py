from django.urls import path
from .views import admin_dashboard, vendor_dashboard, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # JWT Authentication Endpoints
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Make sure this points to CustomTokenObtainPairView
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Dashboard Views
    path('admin/dashboard/', admin_dashboard, name='admin_dashboard'),
    path('vendor/dashboard/', vendor_dashboard, name='vendor_dashboard'),
]
