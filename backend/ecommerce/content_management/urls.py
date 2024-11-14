from django.urls import path
from . import views

urlpatterns = [
    #Aboutus dropdown
    path('aboutus/dropdown/', views.aboutus_dropdown_list, name='aboutus_dropdown_list'),
    path('aboutus/dropdown/create/', views.aboutus_dropdown_create, name='aboutus_dropdown_create'),
    path('aboutus/dropdown/<int:pk>/', views.aboutus_dropdown_detail, name='aboutus_dropdown_detail'),
    path('aboutus/dropdown/<int:pk>/edit/', views.aboutus_dropdown_edit, name='aboutus_dropdown_edit'),
    path('aboutus/dropdown/<int:pk>/delete/', views.aboutus_dropdown_delete, name='aboutus_dropdown_delete'),


    path('aboutus/ourteam/', views.aboutus_ourteam_list, name='aboutus_ourteam_list'),
    path('aboutus/ourteam/create/', views.aboutus_ourteam_create, name='aboutus_ourteam_create'),

    #about us Mission and Vision
    path('aboutus/mv/', views.aboutus_mv_list, name='aboutus_mv_list'),
    path('aboutus/mv/<int:pk>/', views.aboutus_mv_detail, name='aboutus_mv_detail'),
    path('aboutus/mv/<int:pk>/edit/', views.aboutus_mv_edit, name='aboutus_mv_edit'),

]