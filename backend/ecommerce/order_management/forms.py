from django import forms 
from .models import Coupon, Order, OrderItems, Payment, Cart, CartItems
from django.forms import inlineformset_factory

class CouponForm(forms.ModelForm):
    class Meta:
        model = Coupon
        fields = ['coupon_code','coupon_name', 'coupon_discount', 'coupon_validity', 'status', 'usage_type', 'usage_limit' ]

class OrderForm(forms.ModelForm):
    class Meta: 
        model= Order
        fields = ['customer_id','total_amount','status','payment_type','coupon_id','shipping_address','shipping_city','shipping_postal_code']


class OrderItemForm(forms.ModelForm):
    class Meta: 
        model= OrderItems
        fields = ['product_id','quantity','product_variant_id','price','subtotal']

#Formset for Order attribute
OrderFormset = inlineformset_factory(
    Order, OrderItems,
    form = OrderItemForm,
    extra=1, can_delete=True
)

class CartForm(forms.ModelForm):
    class Meta:
        model = Cart
        fields = ['customer_id', 'total_amount']

class CartItemsForm(forms.ModelForm):
    class Meta:
        model = CartItems
        fields = ['product_id', 'product_varient_id','quantity','price']

CartFormset = inlineformset_factory(
    Cart , CartItems, 
    form = CartItems,
    extra=1, can_delete=True
)