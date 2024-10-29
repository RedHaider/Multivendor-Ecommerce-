from rest_framework import serializers
from .models import Product, Category, ProductType, ProductAttribute, ProductImage , Brand , ProductType, SubCategory
from accounts.serializers import UserSerializer



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = '__all__'

class ProductAttributeSerializer(serializers.ModelSerializer):
    color = serializers.StringRelatedField()
    size = serializers.StringRelatedField()
    class Meta:
        model = ProductAttribute
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
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
    user = UserSerializer()
    

    class Meta:
        model = Product
        fields = [ 'id', 'name', 'product_id', 'description', 'price', 'purchased_price',
            'category', 'subcategory', 'product_type', 'brand', 'stock_level', 'vendor',
            'user', 'image', 'sku','product_details', 'in_stock', 'attributes', 'images',
            'created_at', 'updated_at'
            ]
        

