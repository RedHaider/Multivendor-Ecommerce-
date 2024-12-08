from django.urls import path
from . import views
from .views import HomeCarouselListView , ContactUsFAQView , HomeBannerListViewAPI , AboutUsDropdownListView , AboutUsOurTeamListView , AboutUsMVListView

urlpatterns = [
    #Aboutus dropdown
    path('aboutus/dropdown/', views.aboutus_dropdown_list, name='aboutus_dropdown_list'),
    path('aboutus/dropdown/create/', views.aboutus_dropdown_create, name='aboutus_dropdown_create'),
    path('aboutus/dropdown/<int:pk>/', views.aboutus_dropdown_detail, name='aboutus_dropdown_detail'),
    path('aboutus/dropdown/<int:pk>/edit/', views.aboutus_dropdown_edit, name='aboutus_dropdown_edit'),
    path('aboutus/dropdown/<int:pk>/delete/', views.aboutus_dropdown_delete, name='aboutus_dropdown_delete'),


    path('aboutus/ourteam/', views.aboutus_ourteam_list, name='aboutus_ourteam_list'),
    path('aboutus/ourteam/create/', views.aboutus_ourteam_create, name='aboutus_ourteam_create'),
    path('aboutus_ourteam/edit/<int:pk>/', views.aboutus_ourteam_edit, name='aboutus_ourteam_edit'),
    path('aboutus_ourteam/delete/<int:pk>/', views.aboutus_ourteam_delete, name='aboutus_ourteam_delete'),

    #about us Mission and Vision
    path('aboutus/mv/', views.aboutus_mv_list, name='aboutus_mv_list'),
    path('aboutus/mv/<int:pk>/', views.aboutus_mv_detail, name='aboutus_mv_detail'),
    path('aboutus/mv/<int:pk>/edit/', views.aboutus_mv_edit, name='aboutus_mv_edit'),

    path('home_carousal/', views.HomeCarousalListView.as_view(), name='home-carousal-list'),
    path('home_carousal/add/', views.HomeCarousalCreateView.as_view(), name='home-carousal-add'),
    path('home_carousal/<int:pk>/', views.HomeCarousalDetailView.as_view(), name='home-carousal-detail'),
    path('home_carousal/<int:pk>/edit/', views.HomeCarousalUpdateView.as_view(), name='home-carousal-edit'),
    path('home_carousal/<int:pk>/delete/', views.HomeCarousalDeleteView.as_view(), name='home-carousal-delete'),

    #Banner 
    path('home_banner/', views.HomeBannerListView.as_view(), name='home-banner-list'),  # List
    path('home_banner/add/', views.HomeBannerCreateView.as_view(), name='home-banner-add'),  # Add
    path('home_banner/<int:pk>/edit/', views.HomeBannerUpdateView.as_view(), name='home-banner-edit'),  # Edit
    path('home_banner/<int:pk>/', views.HomeBannerDetailView.as_view(), name='home-banner-detail'),

    #Footer Description
    path('footer_description/', views.FooterDescriptionListView.as_view(), name='footer-description-list'),
    path('footer_description/<int:pk>/edit/', views.FooterDescriptionUpdateView.as_view(), name='footer-description-edit'),
    path('footer_description/<int:pk>/', views.FooterDescriptionDetailView.as_view(), name='footer-description-detail'),

    #about us FAS
    path('contactus_faq/', views.ContactUsFAQListView.as_view(), name='contactus-faq-list'),
    path('contactus_faq/add/', views.ContactUsFAQCreateView.as_view(), name='contactus-faq-add'),
    path('contactus_faq/<int:pk>/edit/', views.ContactUsFAQUpdateView.as_view(), name='contactus-faq-edit'),
    path('contactus_faq/<int:pk>/', views.ContactUsFAQDetailView.as_view(), name='contactus-faq-detail'),
    path('contactus_faq/<int:pk>/delete/', views.ContactUsFAQDeleteView.as_view(), name='contactus-faq-delete'),

    #logo
    path('logo_main/', views.LogoMainListView.as_view(), name='logo-main-list'),
    path('logo_main/<int:pk>/edit/', views.LogoMainUpdateView.as_view(), name='logo-main-edit'),
    path('logo_main/<int:pk>/', views.LogoMainDetailView.as_view(), name='logo-main-detail'),

    #contactUs
    path('contactus_form/', views.ContactUsFormListView.as_view(), name='contactus-form-list'),
    path('contactus_form/<int:pk>/', views.ContactUsFormDetailView.as_view(), name='contactus-form-detail'),
    path('contactus_form/<int:pk>/delete/', views.ContactUsFormDeleteView.as_view(), name='contactus-form-delete'),

    #blog

    #API
    path('api/carousels/', HomeCarouselListView.as_view(), name='home_carousel_list'),
    path('api/contactus-faq/', ContactUsFAQView.as_view(), name='contactus-faq'),
    path('api/contactus-form/', views.contact_us_form, name='contact-us-form'),
    path('api/home-banner/', HomeBannerListViewAPI.as_view(), name='home-banner-list-api'),
    path('api/aboutus-dropdown/', AboutUsDropdownListView.as_view(), name='aboutus-dropdown-list'),
    path('api/aboutus-ourteam/', AboutUsOurTeamListView.as_view(), name='aboutus-ourteam-list'),
    path('api/aboutus-mv/', AboutUsMVListView.as_view(), name='aboutus-mv-list'),

]