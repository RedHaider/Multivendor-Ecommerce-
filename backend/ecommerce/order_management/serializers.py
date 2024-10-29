
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Cart, CartItems, OrderItems, Order
from product_management.serializers import ProductSerializer 
from accounts.models import *
from order_management.models import Coupon
User = get_user_model()
from decimal import Decimal

class CouponValidationSerializer(serializers.Serializer):
    coupon_code = serializers.CharField(max_length=20)
    cart_items = serializers.ListField(child=serializers.DictField())  # List of cart items to validate against
    discount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)  # Discount amount
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)  # Total after discount

    def validate_coupon(self, coupon_code):
        """
        Validate if the coupon is active, not expired, and within usage limits.
        """
        try:
            coupon = Coupon.objects.get(coupon_code=coupon_code, status='active')
        except Coupon.DoesNotExist:
            raise serializers.ValidationError("Invalid or inactive coupon code.")

        # Check if coupon has expired
        if coupon.coupon_validity and timezone.now().date() > coupon.coupon_validity:
            raise serializers.ValidationError("Coupon has expired.")

        # Check coupon usage type and limit
        if coupon.usage_type == 'fixed' and coupon.times_used >= coupon.usage_limit:
            raise serializers.ValidationError("Coupon usage limit reached.")

        return coupon

    def validate(self, data):
        coupon_code = data.get('coupon_code')
        cart_items = data.get('cart_items')

        # Validate the coupon
        coupon = self.validate_coupon(coupon_code)

        # Calculate the total discount
        discount = Decimal(0)  # Use Decimal for monetary calculations
        total = Decimal(0)

        for item in cart_items:
            price = Decimal(item.get('price'))  # Convert price to Decimal
            quantity = Decimal(item.get('quantity'))  # Convert quantity to Decimal

            # Assuming the coupon applies to all products
            discount += (coupon.coupon_discount / Decimal(100)) * price * quantity
            total += price * quantity

        total_after_discount = total - discount
        data['discount'] = discount
        data['total'] = total_after_discount

        return data

class CartItemSerializer(serializers.ModelSerializer):
    # product_name = serializers.ReadOnlyField(source='product_id.name')  # Correct field name for the product
    variant_details = serializers.SerializerMethodField()  # Custom method for showing variant details
    product_id = ProductSerializer()
    class Meta:
        model = CartItems
        fields = ['product_id', 'product_variant_id', 'variant_details', 'quantity', 'price', 'subtotal']

    def get_variant_details(self, obj):
        # Customize this based on what you want to display for the variant
        variant = obj.product_variant_id
        return {
            "id": variant.id,
            "image": variant.image.url,
            "color": variant.color.color_name,  # Assuming color is a ForeignKey
            "size": variant.size.size_name  # Assuming size is a ForeignKey
        }



class CartSerializer(serializers.ModelSerializer):
    cartitems = CartItemSerializer(many=True)  # No need for 'source' since the field name and related_name are the same
    customer_username = serializers.ReadOnlyField(source='customer_id.username')

    class Meta:
        model = Cart
        fields = ['cart_id', 'customer_id', 'customer_username', 'total_amount', 'status', 'cartitems']


class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    product_variant_id = serializers.IntegerField()
    quantity = serializers.IntegerField()
    customer_id = serializers.IntegerField(required=False)  # Optional field


from .models import Order, OrderItems, Vendor

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ['product_id', 'product_variant_id', 'quantity', 'price']

class VendorOrderSerializer(serializers.Serializer):
    vendor_id = serializers.IntegerField()
    items = OrderItemSerializer(many=True)

class OrderSerializer(serializers.ModelSerializer):
    vendor_orders = VendorOrderSerializer(many=True)  # To handle the nested vendor orders

    class Meta:
        model = Order
        fields = [
            'customer_id', 'payment_type', 'shipping_address', 'shipping_city',
            'shipping_postal_code', 'order_note', 'total_amount', 'sub_total',
            'coupon_id', 'vendor_orders'
        ]

    def validate_customer_id(self, value):
        # Ensure that the user is a customer
        customer = Customer.objects.filter(user_id=value).first()
        if not customer:
            raise serializers.ValidationError("The customer ID is not valid or does not exist.")
        return value

    def validate(self, data):
        vendor_orders = data.get('vendor_orders', [])
        for vendor_order in vendor_orders:
            vendor_id = vendor_order.get('vendor_id')
            vendor = Vendor.objects.filter(user_id=vendor_id).first()
            if not vendor:
                raise serializers.ValidationError(f"Vendor with ID {vendor_id} is not valid.")
        return data

    def create(self, validated_data):
        # Remove vendor_orders from validated data
        vendor_orders_data = validated_data.pop('vendor_orders')
        
        # Create the main order
        order = Order.objects.create(**validated_data)

        # Iterate through the vendor orders to process each vendor's items
        for vendor_order_data in vendor_orders_data:
            vendor_id = vendor_order_data.get('vendor_id')
            vendor = Vendor.objects.get(user_id=vendor_id)  # Assume the validation passed
            items_data = vendor_order_data.get('items')

            # Create the items associated with this vendor
            for item_data in items_data:
                OrderItems.objects.create(
                    order=order,
                    product_id=item_data['product_id'],
                    product_variant_id=item_data['product_variant_id'],
                    quantity=item_data['quantity'],
                    price=item_data['price'],
                    subtotal=item_data['quantity'] * item_data['price']
                )

        return order















