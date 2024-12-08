from rest_framework import serializers
from .models import Product, Category, ProductType, ProductAttribute, ProductImage , Brand , ProductType, SubCategory , Review, VendorReview
from accounts.serializers import UserSerializer , VendorSerializer 



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
    # vendor = serializers.StringRelatedField()  # Show the vendor name
    user = UserSerializer()
    vendor = VendorSerializer( read_only=True)
    

    class Meta:
        model = Product
        fields = [ 'id', 'name', 'product_id', 'description', 'price', 'purchased_price',
            'category', 'subcategory', 'product_type', 'brand', 'stock_level', 'vendor',
            'user', 'image', 'sku','product_details', 'in_stock', 'attributes', 'images',
            'created_at', 'updated_at'
            ]



class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Here, you don't need a queryset because it's read-only
    
    class Meta:
        model = Review
        fields = ['product', 'user', 'comment', 'rating', 'status', 'vendor', 'created_at', 'updated_at']
        read_only_fields = ['status', 'created_at', 'updated_at', 'user', 'vendor']

    def validate(self, data):
        return data

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['vendor'] = validated_data['product'].vendor
        return super().create(validated_data)

class VendorReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  

    class Meta:
        model = VendorReview
        fields = ['user', 'comment', 'rating', 'vendor']  
    
    def validate(self, data):
        rating = data.get('rating')
        if rating < 1 or rating > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        comment = data.get('comment')
        if len(comment) < 10:
            raise serializers.ValidationError("Comment must be at least 10 characters long.")
        
        return data
    
    def create(self, validated_data):
        # Assign the logged-in user automatically to the review
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
