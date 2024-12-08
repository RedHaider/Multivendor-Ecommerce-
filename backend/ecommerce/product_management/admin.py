from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Banner, Slider, Size, Color, Brand, Category, SubCategory, Product, ProductImage, ProductAttribute , Review, VendorReview

admin.site.register(Banner)
admin.site.register(Slider)
admin.site.register(Size)
admin.site.register(Color)
admin.site.register(Brand)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(ProductAttribute)
admin.site.register(Review)
admin.site.register(VendorReview)