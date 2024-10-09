from django.db import models
from django.conf import settings  # Import settings
from accounts.models import Vendor 
from django.contrib.auth import get_user_model  # Import get_user_model
# Create your models here.


User = get_user_model()  # Retrieve the user model

class ProductType(models.Model):
    product_type_name = models.CharField(max_length=255)
    product_type_slug = models.SlugField(max_length=255)
    product_type_image = models.ImageField(upload_to='category_images/', blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Category(models.Model):
    product_type = models.ForeignKey(ProductType, on_delete= models.CASCADE, related_name = 'product_type')
    category_name = models.CharField(max_length=255)
    category_slug = models.SlugField(max_length=255)
    category_image = models.ImageField(upload_to='category_images/', blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.category_name
    
class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete= models.CASCADE, related_name = 'subcategories')
    subcategory_name = models.CharField(max_length=255)
    subcategory_slug = models.SlugField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.subcategory_name
    
class Brand(models.Model):
    brand_name = models.CharField(max_length=255)
    brand_slug = models.SlugField(max_length=255)
    brand_image = models.ImageField(upload_to='brand_images/',blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Color(models.Model):
    color_name = models.CharField(max_length=255)
    color_code = models.CharField(max_length=7)  # e.g., '#FFFFFF'
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.color_name

# Size Model
class Size(models.Model):
    size_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.size_name


class Product(models.Model):
    name = models.CharField(max_length=255)
    product_id = models.CharField(max_length=15, unique=True, blank=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    purchased_price = models.DecimalField(max_digits=10, decimal_places=2 )
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True)
    product_type = models.ForeignKey(ProductType, on_delete=models.SET_NULL, null=True)

    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True)
    stock_level = models.IntegerField(default=0)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sku = models.CharField(max_length=255, null=True, blank=True)  # New field
    in_stock = models.BooleanField(default=True)  # New in_stock field

    def generate_product_id(self):
        last_product = Product.objects.order_by('-id').first()
        if last_product:
            last_number = int(last_product.product_id[3:])  # Extract the numeric part of the ID
        else:
            last_number = 0
        new_number = last_number + 1
        return f"PRO{new_number:09d}"  # Generates IDs like PRO000000001

    def save(self, *args, **kwargs):
        if not self.product_id:
            self.product_id = self.generate_product_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

# Product Attributes (Colors, Sizes)



class ProductAttribute(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='attributes')
    color = models.ForeignKey(Color, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_varient_images/', blank=True,null=True)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} - {self.color.color_name} - {self.size.size_name}"

# Product Images Model (for additional images)
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    photo_name = models.ImageField(upload_to='product_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Image for {self.product.name}"
    
# Reviews Model
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.TextField()
    rating = models.IntegerField()  # Assuming 1 to 5 ratings
    status = models.CharField(max_length=50, choices=[('approved', 'Approved'), ('pending', 'Pending')], default='pending')
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Review for {self.product.name} by {self.user.username}"
    
# Sliders Model
class Slider(models.Model):
    slider_title = models.CharField(max_length=255)
    short_title = models.CharField(max_length=255, blank=True, null=True)
    slider_image = models.ImageField(upload_to='slider_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.slider_title
    
# Banners Model
class Banner(models.Model):
    banner_title = models.CharField(max_length=255)
    banner_url = models.URLField(max_length=255, blank=True, null=True)
    banner_image = models.ImageField(upload_to='banner_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.banner_title