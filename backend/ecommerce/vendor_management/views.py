from django.shortcuts import render , get_object_or_404, render , redirect
from accounts.models import Vendor, User
from product_management.models import Product
from order_management.models import Order
from django.contrib import messages
# Create your views here.


def vendor_form(request):
    return render(request, 'pages/vendor-profile.html' )

def vendor_list(request):
    vendors = Vendor.objects.filter(user__role='vendor', user__email_verified=True)
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

def vendor_request_list(request):
    vendors = Vendor.objects.filter(user__role='vendor', user__email_verified=False)

    context = {
        'vendors': vendors
    }
    return render(request, 'pages/vendor_request_list.html', context)

def toggle_email_varification(request, pk):
    vendor = get_object_or_404(User, id=pk, role='vendor')
    if not vendor.email_verified:
        vendor.email_verified = True
        vendor.save()
        messages.success(request, f"Vendor {vendor.email} has been verified successfully.")
    else:
        messages.error(request, f"Vendor {vendor.email} is already verified.")

    return redirect('vendor-request-list')