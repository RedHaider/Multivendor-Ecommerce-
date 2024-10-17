from django.urls import path
from .views import banner_list, banner_edit , banner_form, banner_delete, brand_list, brand_form , brand_edit, category_edit, category_form, category_list, color_edit, color_form, color_list, review_edit , review_form ,review_list ,size_edit ,size_form, size_list ,slider_edit, slider_form, slider_list, brand_delete, subcategory_edit ,subcategory_form ,subcategory_list, category_delete  , color_delete , size_delete, subcategory_delete, slider_delete , product_form, product_detail, product_edit, product_list , product_delete, product_type_list, product_type_form, product_type_edit, product_type_delete , ProductListView ,CategoryView , ProductTypeView, BrandView

urlpatterns = [
    #banner
    path('banner/list/', banner_list, name='banner-list'),
    path('banner/create/', banner_form, name='banner-form'),
    path('banner/edit/<int:pk>/', banner_edit, name='banner-edit'),
    path('banner/delete/<int:pk>/', banner_delete, name='banner-delete'),

    #brand
    path('brand/list/', brand_list, name='brand-list'),
    path('brand/create/', brand_form, name='brand-form'),
    path('brand/edit/<int:pk>/', brand_edit, name='brand-edit'),
    path('brand/delete/<int:pk>/', brand_delete, name='brand-delete'),


    #category
    path('category/list/', category_list, name='category-list'),
    path('category/create/', category_form, name='category-form'),
    path('category/edit/<int:pk>/', category_edit, name='category-edit'),
    path('category/delete/<int:pk>/', category_delete, name='category-delete'),

    #color
    path('color/list/', color_list, name='color-list'),
    path('color/create/', color_form, name='color-form'),
    path('color/edit/<int:pk>/', color_edit, name='color-edit'),
    path('color/delete/<int:pk>/', color_delete, name='color-delete'),

    #review
    path('review/', review_list, name='review-list'),
    path('review-edit/', review_edit, name='review-edit'),
    path('review-form/', review_form, name='review-form'),

    #size
    path('size/list/', size_list, name='size-list'),
    path('size/create/', size_form, name='size-form'),
    path('size/edit/<int:pk>/', size_edit, name='size-edit'),
    path('size/delete/<int:pk>/', size_delete, name='size-delete'),

    #slider
    path('slider/', slider_list, name='slider-list'),
    path('slider/create', slider_form, name='slider-form'),
    path('slider/edit/<int:pk>', slider_edit, name='slider-edit'),
    path('slider/delete/<int:pk>', slider_delete, name='slider-delete'),

    #subcategory
    path('subcategories/', subcategory_list, name='subcategory-list'),
    path('subcategories/create/', subcategory_form, name='subcategory-form'),
    path('subcategories/edit/<int:pk>/', subcategory_edit, name='subcategory-edit'),
    path('subcategories/delete/<int:pk>/', subcategory_delete, name='subcategory-delete'),

    #product
    path('product/', product_list, name='product-list'),
    path('product/create/', product_form, name='product-form'),
    path('product/details/<int:pk>', product_detail, name='product-detail'),
    path('product/edit/<int:pk>/', product_edit, name='product-edit'),
    path('product/delete/<int:pk>/', product_delete, name='product-delete'),

    path('product-type/list/', product_type_list, name='product-type-list'),
    path('product-type/create/', product_type_form, name='product-type-form'),
    path('product-type/edit/<int:pk>/', product_type_edit, name='product-type-edit'),
    path('product-type/delete/<int:pk>/', product_type_delete, name='product-type-delete'),


    ################################################ API ###############################

    path('api/products/', ProductListView, name='api-product-list' ),
    path('api/category/', CategoryView, name='api-category-list' ),
    path('api/product-type/', ProductTypeView, name='api-product-type-list' ),
    path('api/brand/', BrandView, name='api-brand-list' )

]

 