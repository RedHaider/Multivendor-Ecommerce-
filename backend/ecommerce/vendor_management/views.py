from django.shortcuts import render , get_object_or_404, render
from accounts.models import Vendor
from product_management.models import Product
from order_management.models import Order
# Create your views here.


def vendor_form(request):
    return render(request, 'pages/vendor-profile.html' )

def vendor_list(request):
    vendors = Vendor.objects.all()
    return render(request, 'vendor_management.html',{'vendors':vendors})

def vendor_details(request, vendor_id):
    vendor = get_object_or_404(Vendor, id=vendor_id)
    return render(request, 'pages/vendor-details.html', {'vendor': vendor})

def vendor_products(request, vendor_id):
    vendor = get_object_or_404(Vendor, id=vendor_id)
    products = Product.objects.filter(vendor=vendor)
    return render(request, 'pages/vendor-products.html', {'vendor':vendor , 'products':products})

def vendor_order_list(request, vendor_id):
    vendor = get_object_or_404(Vendor, id=vendor_id)
    orders = Order.objects.filter(vendor=vendor)
    return render(request, 'pages/vendor-order.html', {'vendor': vendor, 'orders': orders})