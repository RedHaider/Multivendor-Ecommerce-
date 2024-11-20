from django.urls import path
from .views import vendor_list , vendor_details , vendor_form, vendor_products, vendor_order_list, vendor_request_list, toggle_email_varification

urlpatterns = [
    path('vendor-form/', vendor_form, name='vendor-form'),
    path('vendor-list/', vendor_list, name='vendor-list'),
    path('vendor-management/vendor-details/<int:vendor_id>/', vendor_details, name='vendor_details'),
    path('vendor/<int:vendor_id>/products/', vendor_products , name='vendor-products' ),
    path('vendor/<int:vendor_id>/orders/', vendor_order_list, name='vendor-order-list'),
    path('vendor-request-list', vendor_request_list, name='vendor-request-list'),
    path('vendors/toggle-verification/<int:pk>/', toggle_email_varification, name='toggle-email-verification'),

]