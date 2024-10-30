from django.urls import path
from .views import order_list, coupon_list, coupon_edit, coupon_form, coupon_delete, order_form ,order_delete ,order_edit, cart_list ,cart_delete ,cart_form , cart_edit, cart_detail , add_to_cart ,get_cart ,update_cart, order_detail_view, process_order ,validate_coupon, get_customer_orders

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
    path('order/delete/<int:pk>/', order_delete ,name='order-delete'),
    path('order/<str:order_id>/', order_detail_view, name='order-detail'),

#cart 
    path('cart/', cart_list, name='cart-list'),
    path('cart/create/', cart_form, name='cart-form'),
    path('cart/edit/<int:pk>/', cart_edit , name= 'cart-edit'),
    path('cart/delete/<int:pk>/', cart_delete ,name='cart-delete'),
    path('cart/details/<int:pk>', cart_detail, name='cart-detail'),

    ################################################ API ###############################

    path('api/add-to-cart/', add_to_cart, name="add-to-cart"),
    path('api/cart-get/', get_cart, name="get-cart"),
    path('api/cart-update/', update_cart, name='update-cart'),
    path('api/validate-coupon/', validate_coupon, name='validate_coupon'),
    path('api/orders/create/', process_order, name='create-order'),
    path('api/orders/', get_customer_orders, name = 'get-customer-orders' )

]