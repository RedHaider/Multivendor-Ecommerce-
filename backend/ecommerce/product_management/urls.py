from django.urls import path
from .views import banner_list, banner_edit , banner_form, banner_delete, brand_list, brand_form , brand_edit, category_edit, category_form, category_list, color_edit, color_form, color_list, review_edit , review_form ,review_list ,size_edit ,size_form, size_list ,slider_edit, slider_form, slider_list, subcategory_edit ,subcategory_form ,subcategory_list

urlpatterns = [
    #banner
    path('banner/list/', banner_list, name='banner-list'),
    path('banner/create/', banner_form, name='banner-form'),
    path('banner/edit/<int:pk>/', banner_edit, name='banner-edit'),
    path('banner/delete/<int:pk>/', banner_delete, name='banner-delete'),

    #brand
    path('brand/', brand_list, name='brand-list'),
    path('brand-edit/', brand_edit, name='brand-edit'),
    path('brand-form/', brand_form, name='brand-form'),

    #category
    path('category/', category_list, name='category-list'),
    path('category-edit/', category_edit, name='category-edit'),
    path('category-form/', category_form, name='category-form'),

    #color
    path('color/', color_list, name='color-list'),
    path('color-edit/', color_edit, name='color-edit'),
    path('color-form/', color_form, name='color-form'),

    #review
    path('review/', review_list, name='review-list'),
    path('review-edit/', review_edit, name='review-edit'),
    path('review-form/', review_form, name='review-form'),

    #size
    path('size/', size_list, name='size-list'),
    path('size-edit/', size_edit, name='size-edit'),
    path('size-form/', size_form, name='size-form'),

    #slider
    path('slider/', slider_list, name='slider-list'),
    path('slider-edit/', slider_edit, name='slider-edit'),
    path('slider-form/', slider_form, name='slider-form'),

    #subcategory
    path('subcategory/', subcategory_list, name='subcategory-list'),
    path('subcategory-edit/', subcategory_edit, name='subcategory-edit'),
    path('subcategory-form/', subcategory_form, name='subcategory-form'),


]

