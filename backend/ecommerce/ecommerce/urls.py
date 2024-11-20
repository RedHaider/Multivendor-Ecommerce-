#ecommerce/urls.py
from django.contrib import admin
from django.urls import path, include
from .views import dashboard, product_management,sales_performance,promotion_discount,commission,registration, login , add_vendor, commission_form, commission_details, coupon_form,   coupon_edit ,commission_edit ,vendor_edit ,VendorPasswordResetView , CustomPasswordResetConfirmView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('dashboard/', dashboard, name='dashboard'),
    path('product_management/', product_management, name='product_management'),
    path('sales-performance/', sales_performance, name='sales_performance'),
    path('promotion-discount/', promotion_discount, name='promotion_discount'),
    path('commission/', commission, name='commission'),
    path('registration/', registration, name='registration'),
    path('login/', login, name='login'),
    path('api/accounts/', include('accounts.urls')),

    #form
    path('', include('accounts.urls')),

    path('sales-performance/', sales_performance, name='sales_performance'),
    path('promotion-discount/coupon-form', coupon_form, name='coupon_form'),
    path('vendor-management/add-vendor', add_vendor, name='add_vendor'),
    path('commission/commission-form', commission_form, name='commission_form'),
    path('commission/commission-details', commission_details, name='commission_details'),
    path('registration/', registration, name='registration'),
    path('coupon-edit/', coupon_edit, name='coupon-edit'),
    path('vendor-edit/', vendor_edit, name='vendor-edit'),
    path('commission-edit/', commission_edit, name='commission-edit'),

    path('product-management/',include('product_management.urls')),
    path('order-management/', include('order_management.urls')),
    path('vendor-management/', include('vendor_management.urls')),
    path('content-management/', include('content_management.urls')),

    #PASSOWRD REST URLS
    path('password-reset/', VendorPasswordResetView.as_view(), name='password_reset'),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),

   

]

# Serving media files in development mode
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

