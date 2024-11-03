
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Cart, CartItems, OrderItems, Order
from product_management.serializers import   ProductAttributeSerializer, ProductSerializer
from product_management.models import   Product
from accounts.models import *
from accounts.serializers import VendorSerializer
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

class ProductSerializer(serializers.ModelSerializer):
    variants = ProductAttributeSerializer(many=True, read_only=True)  # Include variants if needed

    class Meta:
        model = Product
        fields = '__all__'

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
    product_id = ProductSerializer()
    product_variant_id = ProductAttributeSerializer()

    class Meta:
        model = OrderItems
        fields = ['product_id', 'product_variant_id', 'quantity', 'price']

class VendorOrderSerializer(serializers.Serializer):
    vendor = VendorSerializer()  # Serialize the full vendor object
    items = OrderItemSerializer(many=True)



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            'customerID', 'name', 'phone_number', 'address', 'division',
            'district', 'state', 'Thana', 'postal_code'
        ]


class OrderSerializer(serializers.ModelSerializer):
    vendor_orders = serializers.SerializerMethodField()  # Custom method to retrieve vendor orders
    customer_id = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'customer_id', 'payment_type', 'shipping_address', 'shipping_city',
            'shipping_postal_code', 'order_note', 'total_amount', 'sub_total',
            'coupon_id', 'vendor_orders', 'status', 'order_date', 'order_id'
        ]

    def get_customer_id(self, obj):
        # Access and serialize the customer profile related to customer_id
        customer_profile = obj.customer_id  # Assuming related name is `customer_profile`
        return CustomerSerializer(customer_profile).data  # Serialize customer data
    
    def get_vendor_orders(self, obj):
        """
        This method retrieves vendor orders related to the order.
        Groups the items by vendor and includes vendor information.
        """
        vendor_orders_data = []

        # Get all order items related to this order, along with product and vendor details
        vendor_items = obj.orderitems.all().select_related('product_id__vendor')

        # Dictionary to group items by vendor
        vendors = {}

        for item in vendor_items:
            vendor = item.product_id.vendor

            if vendor.id not in vendors:
                # Add a new vendor with empty items initially
                vendors[vendor.id] = {
                    'vendor': VendorSerializer(vendor).data,  # Serialize vendor information
                    'items': []
                }

            # Add the item to the vendor's list of items
            vendors[vendor.id]['items'].append({
                'product': ProductSerializer(item.product_id).data,  # Serialize product details
                'product_variant': ProductAttributeSerializer(item.product_variant_id).data if item.product_variant_id else None,
                'quantity': item.quantity,
                'price': item.price,
            })

        # Convert the vendors dictionary to a list of vendor orders
        for vendor_order in vendors.values():
            vendor_orders_data.append(vendor_order)

        return vendor_orders_data












