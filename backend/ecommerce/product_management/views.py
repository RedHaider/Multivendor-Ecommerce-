from django.shortcuts import render, redirect, get_object_or_404
from .models import Banner, Slider, Size, Color, Brand, Category, SubCategory, Product, ProductImage, ProductAttribute , Review
from .forms import BannerForm, SliderForm ,SizeForm , BrandForm , CategoryForm , SubCategoryForm, ReviewForm , ColorForm


#Banner Crud Operations 
def banner_list(request):
    banner = Banner.objects.all()
    return render(request, 'product_management/banner.html', {'banners': banner})

def banner_form(request):
    if request.method == 'POST':
        form = BannerForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('banner-list')  # Redirect to the banner list after saving
    else:
        form = BannerForm()

    return render(request, 'product_management/banner-form.html', {'form': form})

def banner_edit(request, pk):
    banner = get_object_or_404(Banner, pk=pk)
    if request.method == 'POST':
        form = BannerForm(request.POST, request.FILES, instance=banner)
        if form.is_valid():
            form.save()
            return redirect('banner-list')
    else:
        form = BannerForm(instance=banner)
    return render(request, 'product_management/banner-edit.html', {'form':form, 'banner':banner})

def banner_delete(request, pk):
    banner = get_object_or_404(Banner, pk=pk)
    if request.method == 'POST':
        banner.delete()
        return redirect('banner-list')
    return render(request, 'product_management/banner-form.html', {'banner':banner})



#brand Crud Operations 
def brand_list(request):
    return render(request, 'product_management/brand.html')

def brand_form(request):
    return render(request, 'product_management/brand-form.html')

def brand_edit(request):
    return render(request, 'product_management/brand-edit.html')

def brand_delete(request):
    return render(request)

#category Crud Operations 
def category_list(request):
    return render(request, 'product_management/category.html')

def category_form(request):
    return render(request, 'product_management/category-form.html')

def category_edit(request):
    return render(request, 'product_management/category-edit.html')


#color Crud Operations 
def color_list(request):
    return render(request, 'product_management/color.html')

def color_form(request):
    return render(request, 'product_management/color-form.html')

def color_edit(request):
    return render(request, 'product_management/color-edit.html')


#review Crud Operations 
def review_list(request):
    return render(request, 'product_management/review.html')

def review_form(request):
    return render(request, 'product_management/review-form.html')

def review_edit(request):
    return render(request, 'product_management/review-edit.html')


#slider Crud Operations 
def slider_list(request):
    return render(request, 'product_management/slider.html')

def slider_form(request):
    return render(request, 'product_management/slider-form.html')

def slider_edit(request):
    return render(request, 'product_management/slider-edit.html')


#subcategory Crud Operations 
def subcategory_list(request):
    return render(request, 'product_management/subcategory.html')

def subcategory_form(request):
    return render(request, 'product_management/subcategory-form.html')

def subcategory_edit(request):
    return render(request, 'product_management/subcategory-edit.html')


#size Crud Operations 
def size_list(request):
    return render(request, 'product_management/size.html')

def size_form(request):
    return render(request, 'product_management/size-form.html')

def size_edit(request):
    return render(request, 'product_management/size-edit.html')



