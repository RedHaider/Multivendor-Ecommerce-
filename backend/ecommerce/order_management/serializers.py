from rest_framework import serializers
from .models import Cart, CartItems, OrderItems, Order

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product_id.name')  # Correct field name for the product
    variant_details = serializers.SerializerMethodField()  # Custom method for showing variant details

    

    class Meta:
        model = CartItems
        fields = ['product_id', 'product_name', 'product_variant_id', 'variant_details', 'quantity', 'price', 'subtotal']

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


from .models import Order, OrderItems, Product

class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ['product_id', 'product_variant_id', 'quantity', 'price']

class VendorOrderSerializer(serializers.Serializer):
    vendor_id = serializers.IntegerField()
    items = OrderItemsSerializer(many=True)

class OrderSerializer(serializers.ModelSerializer):
    vendor_orders = VendorOrderSerializer(many=True)  # New field to handle vendor orders

    class Meta:
        model = Order
        fields = ['customer_id', 'total_amount', 'payment_type', 'shipping_address', 'shipping_city', 'shipping_postal_code', 'vendor_orders', 'coupon_id', 'order_note']

    def create(self, validated_data):
        vendor_orders_data = validated_data.pop('vendor_orders')
        order = Order.objects.create(**validated_data)

        # Create order items for each vendor
        for vendor_order_data in vendor_orders_data:
            for item_data in vendor_order_data['items']:
                product = Product.objects.get(id=item_data['product_id'].id)  # Get the product

                # The vendor is inferred from the product itself
                OrderItems.objects.create(
                    order=order,
                    product_id=product,
                    quantity=item_data['quantity'],
                    price=item_data['price'],
                    product_variant_id=item_data['product_variant_id']  # Use product variant if applicable
                )

        return order
