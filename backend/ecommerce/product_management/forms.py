from django import forms
from .models import Banner, Slider, Size, Color, Brand, Category, SubCategory, Product, ProductImage, ProductAttribute , Review

# Form for Category
class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['category_name', 'category_slug', 'category_image']

# Form for SubCategory
class SubCategoryForm(forms.ModelForm):
    class Meta:
        model = SubCategory
        fields = ['category', 'subcategory_name', 'subcategory_slug']

# Form for Brand
class BrandForm(forms.ModelForm):
    class Meta:
        model = Brand
        fields = ['brand_name', 'brand_slug', 'brand_image']

# Form for Color
class ColorForm(forms.ModelForm):
    class Meta:
        model = Color
        fields = ['color_name', 'color_code']

# Form for Size
class SizeForm(forms.ModelForm):
    class Meta:
        model = Size
        fields = ['size_name']

# Form for Review
class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['product', 'user', 'comment', 'rating', 'status', 'vendor']

# Form for Slider
class SliderForm(forms.ModelForm):
    class Meta:
        model = Slider
        fields = ['slider_title', 'short_title', 'slider_image']

# Form for Banner
class BannerForm(forms.ModelForm):
    class Meta:
        model = Banner
        fields = ['banner_title', 'banner_url', 'banner_image']