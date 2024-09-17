from django.shortcuts import render,  redirect


def dashboard(request):
    return render(request, 'index.html')

def product_management(request):
    return render(request, 'product_management.html')

def order_management(request):
    return render(request, 'order_management.html')

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


#submenu
def add_vendor(request):
    return render(request, 'pages/add-vendor.html' )

def commission_form(request):
    return render(request, 'pages/commission-form.html' )

def commission_details(request):
    return render(request, 'pages/commission-detials.html' )

def coupon_form(request):
    return render(request, 'pages/coupon-form.html' )

def order_details(request):
    return render(request, 'pages/order-details.html' )

def product_form(request):
    return render(request, 'pages/product-form.html' )

def vendor_details(request):
    return render(request, 'pages/vendor-details.html' )

def vendor_profile(request):
    return render(request, 'pages/vendor-profile.html' )