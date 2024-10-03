from django.shortcuts import render,  redirect
from django.contrib.auth.decorators import login_required

@login_required
def dashboard(request):
    return render(request, 'index.html')

@login_required
def product_management(request):
    return render(request, 'product_management.html')

def sales_performance(request):
    return render(request, 'sales_performance_analysis.html')

def promotion_discount(request):
    return render(request, 'promotion_discount.html')

def vendor_management(request):
    return render(request, 'vendor_management.html')

def commission(request):
    return render(request, 'commission.html')

def registration(request):
    return render(request, 'registration.html')

def login(request):
    return render(request, 'login.html')

def vendor_register(request):
    return render(request, 'vendor_registration.html')

def vendor_login(request):
    return render(request, 'vendor_login.html')

#submenu
def add_vendor(request):
    return render(request, 'pages/add-vendor.html' )

def commission_form(request):
    return render(request, 'pages/commission-form.html' )

def commission_details(request):
    return render(request, 'pages/commission-detials.html' )

def coupon_form(request):
    return render(request, 'pages/coupon-form.html' )



def vendor_details(request):
    return render(request, 'pages/vendor-details.html' )

def vendor_profile(request):
    return render(request, 'pages/vendor-profile.html' )




def coupon_edit(request):
    return render(request, 'pages/coupon-edit.html')

def vendor_edit(request):
    return render(request, 'pages/vendor-edit.html')

def commission_edit(request):
    return render(request, 'pages/commission-edit.html')
