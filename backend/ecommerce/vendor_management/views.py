from django.shortcuts import render , get_object_or_404, render , redirect
from accounts.models import Vendor, User
from product_management.models import Product
from order_management.models import Order
from django.contrib import messages
from .serializers import NotificationSerializer
from .models import Notification ,VendorNotification
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
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


class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]  # Optional, if you still want to verify the token

    def get(self, request):
        user_id = request.query_params.get('user_id')  # Get user_id from query params

        if user_id:
            # Fetch notifications by user_id
            notifications = Notification.objects.filter(user_id=user_id)
            
            # Serialize the notifications queryset
            serializer = NotificationSerializer(notifications, many=True)
            
            # Return the serialized data in the response
            return Response(serializer.data)
        else:
            return Response({"error": "User ID not provided"}, status=400)
    

@api_view(['Post'])
def mark_notification_as_read(request):
    if request.user.is_authenticated:
        unread_notification = Notification.objects.filter(user=request.user, is_read=False)
        unread_notification.update(is_read=True)
        return Response({"message":"All Notificaitons marked as read"}, status=200)
    else:
        return Response({"error":"Authentication Failed"}, status=401)
    



def notifications(request):
    if request.user.is_authenticated:
        notifications = VendorNotification.objects.filter(user=request.user, is_read=False)
        notification_count = notifications.count()
        return {'notifications': notifications, 'notification_count': notification_count}
    return {}

