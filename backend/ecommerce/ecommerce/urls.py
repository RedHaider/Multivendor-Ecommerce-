#ecommerce/urls.py
from django.contrib import admin
from django.urls import path, include
from .views import dashboard, product_management,order_management,sales_performance,promotion_discount,vendor_management,commission,registration, login , add_vendor, commission_form, commission_details, coupon_form, order_details, product_form, vendor_details, vendor_profile

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', dashboard, name='dashboard'),
    path('product_management/', product_management, name='product_management'),
    path('order-management/', order_management, name='order_management'),
    path('sales-performance/', sales_performance, name='sales_performance'),
    path('promotion-discount/', promotion_discount, name='promotion_discount'),
    path('vendor-management/', vendor_management, name='vendor_management'),
    path('commission/', commission, name='commission'),
    path('vendor-profile/', vendor_profile, name='vendor_profile'),
    path('registration/', registration, name='registration'),
    path('login/', login, name='login'),
    path('api/accounts/', include('accounts.urls')),

    #submenu's for the the urls
    
    path('product_management/product-form', product_form, name='product_form'),
    path('order-management/order-details', order_details, name='order_details'),
    path('sales-performance/', sales_performance, name='sales_performance'),
    path('promotion-discount/coupon-form', coupon_form, name='coupon_form'),
    path('vendor-management/add-vendor', add_vendor, name='add_vendor'),
    path('vendor-management/vendor-details', vendor_details, name='vendor_details'),
    path('commission/commission-form', commission_form, name='commission_form'),
    path('commission/commission-details', commission_details, name='commission_details'),
    path('registration/', registration, name='registration'),
]
