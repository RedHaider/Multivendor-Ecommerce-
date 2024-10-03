from django.urls import path
from .views import order_list, coupon_list, coupon_edit, coupon_form, coupon_delete, order_form ,order_delete ,order_edit

urlpatterns = [

    path('', order_list, name='order-list'),


#Coupon
    path('coupon/', coupon_list, name='coupon-list'),
    path('coupon/create', coupon_form, name='coupon-form'),
    path('coupon/edit/<int:pk>/', coupon_edit, name='coupon-edit'),
    path('coupon/delete/<int:pk>/', coupon_delete, name='coupon-delete'),

#order
    path('order/', order_list, name='order-list'),
    path('order/create/', order_form, name='order-form'),
    path('order/edit/<int:pk>/', order_edit , name= 'order-edit'),
    path('order/delete/<int:pk>/', order_delete ,name='order-delete')

]