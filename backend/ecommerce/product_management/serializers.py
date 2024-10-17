from rest_framework import serializers
from .models import Product, Category, ProductType, ProductAttribute, ProductImage , Brand



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = '__all__'

class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):

    #including the fields
    attributes = ProductAttributeSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    category = serializers.StringRelatedField()  # Show the category name instead of ID
    subcategory = serializers.StringRelatedField()  # Show the subcategory name
    product_type = serializers.StringRelatedField()  # Show the product type name
    brand = serializers.StringRelatedField()  # Show the brand name
    vendor = serializers.StringRelatedField()  # Show the vendor name
    user = serializers.StringRelatedField()  # Show the user name

    class Meta:
        model = Product
        fields = [            'id', 'name', 'product_id', 'description', 'price', 'purchased_price',
            'category', 'subcategory', 'product_type', 'brand', 'stock_level', 'vendor',
            'user', 'image', 'sku', 'in_stock', 'attributes', 'images',
            'created_at', 'updated_at'
            ]

class BrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        field = '__all__'