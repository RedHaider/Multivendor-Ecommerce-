from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Cart , CartItems ,Coupon , Order ,OrderItems ,Payment

admin.site.register(Cart)
admin.site.register(CartItems)
admin.site.register(Coupon)
admin.site.register(Order)
admin.site.register(Payment)
admin.site.register(OrderItems)