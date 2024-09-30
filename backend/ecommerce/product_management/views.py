from django.shortcuts import render, redirect, get_object_or_404
from .models import Vendor, Banner, Slider, Size, Color, Brand, Category, SubCategory, Product, ProductImage, ProductAttribute , Review
from .forms import BannerForm, SliderForm ,SizeForm , BrandForm , CategoryForm , SubCategoryForm, ReviewForm , ColorForm , ProductForm, ProductAttributeFormSet, ProductImageFormSet


#Banner Crud Operations done
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



# Brand CRUD Operations done

def brand_list(request):
    brands = Brand.objects.all()
    return render(request, 'product_management/brand.html', {'brands': brands})

def brand_form(request):
    if request.method == 'POST':
        form = BrandForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('brand-list')
    else:
        form = BrandForm()

    return render(request, 'product_management/brand-form.html', {'form': form})

def brand_edit(request, pk):
    brand = get_object_or_404(Brand, pk=pk)  # Fetch the brand object using the primary key (pk)
    
    if request.method == 'POST':
        form = BrandForm(request.POST, request.FILES, instance=brand)
        if form.is_valid():
            form.save()
            return redirect('brand-list')
    else:
        form = BrandForm(instance=brand)  # Pre-fill the form with the brand instance data

    # Pass both 'form' and 'brand' to the template
    return render(request, 'product_management/brand-edit.html', {'form': form, 'brand': brand})

def brand_delete(request, pk):
    brand = get_object_or_404(Brand, pk=pk)  # Correct model name
    if request.method == 'POST':
        brand.delete()
        return redirect('brand-list')
    return render(request, 'product_management/brand-delete.html', {'brand': brand})  # Should use brand-delete template


#category Crud Operations  done
def category_list(request):
    category = Category.objects.all()
    return render(request, 'product_management/category.html', {'category':category})

def category_form(request):
    if request.method == 'POST':
        form = CategoryForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('category-list')  # Redirect to the banner list after saving
    else:
        form = CategoryForm()
    return render(request, 'product_management/category-form.html', {'form': form})

def category_edit(request, pk):
    category = get_object_or_404(Category, pk=pk)
    if request.method == 'POST':
        form = CategoryForm(request.POST, request.FILES, instance=category)
        if form.is_valid():
            form.save()
            return redirect('category-list')
    else:
        form = CategoryForm(instance=category)
    return render(request, 'product_management/category-edit.html', {'form':form, 'category':category})

def category_delete(request, pk):
    category = get_object_or_404(Category, pk=pk)
    if request.method == 'POST':
        category.delete()
        return redirect('category-list')
    return render(request, 'product_management/category-list.html', {'category':category})

#color Crud Operations  done
def color_list(request):
    color = Color.objects.all()
    return render(request, 'product_management/color.html', {'color': color})

def color_form(request):
    if request.method == 'POST':
        form = ColorForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('color-list')  
    else:
        form = ColorForm()
    return render(request, 'product_management/color-form.html', {'form': form})

def color_edit(request, pk):
    color = get_object_or_404(Color, pk=pk)
    if request.method == 'POST':
        form = ColorForm(request.POST, request.FILES, instance=color)
        if form.is_valid():
            form.save()
            return redirect('color-list')
    else:
        form = ColorForm(instance=color)
    return render(request, 'product_management/color-edit.html',{'form':form, 'color':color} )

def color_delete(request ,pk):
    color = get_object_or_404(Color, pk=pk)
    if request.method == 'POST':
        color.delete()
        return redirect('color-list')
    return render(request, 'product_management/color-form.html',{'color':color})


#review Crud Operations 
def review_list(request):
    return render(request, 'product_management/review.html')

def review_form(request):
    return render(request, 'product_management/review-form.html')

def review_edit(request):
    return render(request, 'product_management/review-edit.html')


#slider Crud Operations 
def slider_list(request):
    slider = Slider.objects.all()
    return render(request, 'product_management/slider.html', {'slider': slider})

def slider_form(request):
    if request.method == 'POST':
        form =SliderForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('slider-list')  # Redirect to the banner list after saving
    else:
        form = SliderForm()
    return render(request, 'product_management/slider-form.html', {'form':form})

def slider_edit(request, pk):
    slider = get_object_or_404(Slider, pk=pk)
    if request.method == 'POST':
        form = SliderForm(request.POST, request.FILES, instance=slider)
        if form.is_valid():
            form.save()
            return redirect('slider-list')
    else:
        form = SliderForm(instance=slider)
    return render(request, 'product_management/slider-edit.html',{'form':form, 'slider':slider})

def slider_delete(request, pk):
    slider = get_object_or_404(Slider, pk=pk)
    if request.method == 'POST':
        slider.delete()
        return redirect('slider-list')
    return render(request, 'product_management/slider-form.html', {'slider':slider})


#subcategory Crud Operations 
def subcategory_list(request):
    subcategories = SubCategory.objects.all()
    return render(request, 'product_management/subcategory.html',  {'subcategories': subcategories})

def subcategory_form(request):
    if request.method == 'POST':
        form = SubCategoryForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('subcategory-list')
    else:
        form = SubCategoryForm()
    return render(request, 'product_management/subcategory-form.html', {'form': form})

def subcategory_edit(request, pk):
    subcategory = get_object_or_404(SubCategory, pk=pk)
    if request.method == 'POST':
        form = SubCategoryForm(request.POST, instance=subcategory)
        if form.is_valid():
            form.save()
            return redirect('subcategory-list')
    else:
        form = SubCategoryForm(instance=subcategory)
    return render(request, 'product_management/subcategory-edit.html', {'form': form, 'subcategory': subcategory} )

def subcategory_delete(request, pk):
    subcategory = get_object_or_404(SubCategory, pk=pk)
    if request.method == 'POST':
        subcategory.delete()
        return redirect('subcategory-list')
    return render(request, 'product_management/subcategory-form.html',{'subcategory': subcategory})


#size Crud Operations done
def size_list(request):
    size = Size.objects.all()
    return render(request, 'product_management/size.html', {'size':size})

def size_form(request):
    if request.method == 'POST':
        form = SizeForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('size-list')  # Corrected redirect usage
    else:
        form = SizeForm()
    return render(request, 'product_management/size-form.html', {'form': form})

def size_edit(request, pk):
    size = get_object_or_404(Size, pk=pk)  # Ensure you use Size here
    if request.method == 'POST':
        form = SizeForm(request.POST, request.FILES, instance=size)
        if form.is_valid():
            form.save()
            return redirect('size-list')
    else:
        form = SizeForm(instance=size)
    return render(request, 'product_management/size-edit.html', {'form': form, 'size': size}) 

def size_delete(request, pk):
    size = get_object_or_404(Size, pk=pk)
    if request.method == 'POST':
        size.delete()
        return redirect('size-list')
    return render(request, 'product_management/size-list.html')


#size Crud Operations done
def product_list(request):
    products = Product.objects.all()
    return render(request, 'product_management.html', {'products':products})


def product_form(request):
    print('Entering product_form view')
    
    # Fetch the vendor associated with the logged-in user
    vendor = get_object_or_404(Vendor, user=request.user)
    
    if request.method == 'POST':
        product_form = ProductForm(request.POST, request.FILES)
        
        # Pass 'instance=None' for formsets as no Product exists yet
        attribute_formset = ProductAttributeFormSet(request.POST, instance=None)
        image_formset = ProductImageFormSet(request.POST, request.FILES, instance=None)

        if product_form.is_valid() and attribute_formset.is_valid() and image_formset.is_valid():
            print('Form is valid')

            # Create a product instance but don't save it yet
            product = product_form.save(commit=False)  # Do not save to the database yet
            product.user = request.user  # Set the user who is adding the product
            product.vendor = vendor  # Set the vendor based on the logged-in use
            
            
            product.save()  # Now save the product with the user
            
            # Set the product instance in the formsets before saving
            attributes = attribute_formset.save(commit=False)
            for attribute in attributes:
                attribute.product = product
                attribute.save()

            # Save product images
            images = image_formset.save(commit=False)
            for image in images:
                image.product = product
                image.save()

            return redirect('product_management')  # Redirect to your product management page

    else:
        product_form = ProductForm()
        # Formsets need 'instance=None' or they might not render correctly
        attribute_formset = ProductAttributeFormSet(queryset=ProductAttribute.objects.none(), instance=None)
        image_formset = ProductImageFormSet(queryset=ProductImage.objects.none(), instance=None)

    context = {
        'product_form': product_form,
        'attribute_formset': attribute_formset,
        'image_formset': image_formset,
    }

    print(product_form.errors)
    print(attribute_formset.errors)
    print(image_formset.errors)

    return render(request, 'pages/product-form.html', context)


def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)

    # Fetch related attributes and images if needed
    attributes = product.attributes.all()  # Fetching related product attributes
    images = product.images.all()          # Fetching related product images

    return render(request, 'pages/product-details.html', {
        'product': product,
        'attributes': attributes,
        'images': images,
    })