from rest_framework import serializers
from .models import Cart, CartItems

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

