from django import forms
from .models import Banner, Slider, Size, Color, Brand, Category, SubCategory, Product, ProductImage, ProductAttribute , Review
from django.forms import inlineformset_factory

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

# Main product form
class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'purchased_price', 'category', 'subcategory', 'brand', 'stock_level',  'image']

# Product variant form (size, color, image, quantity)
class ProductAttributeForm(forms.ModelForm):
    class Meta:
        model = ProductAttribute
        fields = ['color', 'size', 'image', 'quantity']

# Product image form (for adding multiple images)
class ProductImageForm(forms.ModelForm):
    class Meta:
        model = ProductImage
        fields = ['photo_name']
    
# Formset for product attributes
ProductAttributeFormSet = inlineformset_factory(
    Product, ProductAttribute,
    form=ProductAttributeForm,
    extra=1, can_delete=True
)

# Formset for product images
ProductImageFormSet = inlineformset_factory(
    Product, ProductImage,
    form=ProductImageForm,
    extra=1, can_delete=True
)