from django.shortcuts import render, redirect, get_object_or_404

from django.contrib import messages
from .forms import CouponForm ,OrderForm  , OrderItemForm , OrderFormset ,Cart ,CartForm, CartFormset
from .models import Order, OrderItems, Cart ,CartItems ,Coupon, Payment ,Wishlist

# Create your views here.

def order_list(request):
    return render(request, 'order_management.html')


#coupon 
def coupon_form(request):
    if request.method == 'POST':
        form = CouponForm(request.POST)
        if form.is_valid():
            coupon = form.save(commit=False)  # Create a Coupon instance but don’t save yet
            coupon.user = request.user  # Set the user to the currently logged-in user
            coupon.save() 
            return redirect('coupon-list')
    else:
        form = CouponForm()
    return render(request, 'order_management/coupon_form.html', {'form':form})

def coupon_list(request):
    coupons = Coupon.objects.all()
    return render(request, 'order_management/coupon.html', {'coupons':coupons})

def coupon_edit(request, pk ):
    coupon = get_object_or_404(Coupon, pk=pk)
    if request.method == 'POST':
        form = CouponForm(request.POST, instance=coupon)
        if form.is_valid():
            form.save()
            return redirect('coupon-list')
    else:
        form = CouponForm(instance=coupon)
    return render(request, 'order_management/coupon_edit.html' ,{'form': form , 'coupon':coupon })

def coupon_delete(request, pk):
    coupon = get_object_or_404(Coupon, pk=pk)
    if request.method == 'POST':
        coupon.delete()
        return redirect('coupon-list')
    return render(request, 'order_management/coupon.html' ,{'coupon': coupon})


def order_list(request):
    user = request.user
    if user.is_authenticated and user.role == 'vendor':
        # Retrieve the Vendor instance associated with the logged-in user
        print('#################################################')
        vendor = Vendor.objects.filter(user=user).first()
        print(vendor)
        if vendor:
            # Filter orders where the vendor field matches the vendor instance
            order = Order.objects.filter(vendor=vendor)
            print(order)
        else:
            # If vendor instance not found, return an empty queryset
            order = Order.objects.none()
    else:
        # If user is not a vendor or not authenticated, return an empty queryset
        order = Order.objects.none()

    return render(request, 'order_management/order.html', {'order': order})

def order_form(request):
    if request.method == 'POST':
        
        order_form = OrderForm(request.POST, request.FILES)
        
        
        if order_form.is_valid() :
            print('Form is valid')

            order = order_form.save(commit=False)

            order.save()

            order_formset = OrderFormset(request.POST, request.FILES, instance=order)

            if order_formset.is_valid():
                print("ITEMSSSSSSSSSSSSSS SAVINNNNNNNNNNNNNNNNNNNNNNNNNNN")
                order_items = order_formset.save(commit=False)
                for order_item in order_items:
                    order_item.order = order  
                    order_item.save()

                order_formset.save()  

                return redirect('order-list')
    else:
        order_form = OrderForm()
        order_formset = OrderFormset(queryset=OrderItems.objects.none() ,instance=None)

    context = {
        'order_form': order_form,
        'order_formset': order_formset,
    }
    return render(request, 'order_management/order_form.html', context)

def order_edit(request, pk):
    order = get_object_or_404(Order , pk=pk)
    if request.method == "POST":
        order_form = OrderForm(request.POST,  instance=order)

        if order_form.is_valid():
            print('Form is valid')
            order = order_form.save(commit=False)
            order.save()

            order_formset = OrderFormset(request.POST,  instance=order)

            if order_formset.is_valid():
                print("Updating order items....")
                order_items = order_formset.save(commit=False)

                for order_item in order_items:
                    order_item.order = order
                    order_item.save()
                order_formset.save()

                return redirect('order-list')
    else:
        order_form = OrderForm(instance=order)
        order_formset = OrderFormset(instance=order)

    context = {
        'order_form':order_form,
        'order_formset': order_formset,
        'order':order
    }

    return render(request, 'order_management/order_edit.html',context)
    




def order_delete(request, pk ):
    order = get_object_or_404(Order, pk = pk)

    if request.method == 'POST':
        order.delete()
        return redirect('order-list')
    
    context = {
        'order':order
    }

    return render(request, 'order_management/order_form.html', context)

#Cart handling

def cart_list(request):
    cart = Cart.objects.all()
    context = {
        'cart': cart,
    }
    return render(request, 'order_management/cart.html', context)




def cart_form(request):

    if request.method == 'POST':
        cart_form = CartForm(request.POST, request.FILES)
        print("POST Data:", request.POST) 
        if cart_form.is_valid():
            print('Form is valid')
            cart = cart_form.save(commit=False)
            cart.save()

            cart_formset = CartFormset(request.POST, request.FILES, instance=cart)

            if cart_formset.is_valid():
                print("ITEMSSSSSSSSSSSSSS SAVINNNNNNNNNNNNNNNNNNNNNNNNNNN")
                cart_items = cart_formset.save(commit=False)
                for cart_item in cart_items:
                    cart_item.cart = cart
                    cart_item.save()
                
                cart_formset.save()
                cart.calculate_total_amount()  # Server-side total calculation
                return redirect('cart-list')

    else:
        cart_form = CartForm()
        cart_formset = CartFormset(queryset=CartItems.objects.none() ,instance=None)

    context = {
        'cart_form': cart_form,
        'cart_formset': cart_formset
    }

    return render(request, 'order_management/cart-form.html', context)


def cart_edit(request, pk):
    cart = get_object_or_404(Cart, pk=pk)
    if request.method == "POST":
        cart_form = CartForm(request.POST, instance=cart)

        if cart_form.is_valid():
            print('cart form valid')
            cart = cart_form.save(commit=False)
            cart.save()

            cart_formset = CartFormset(request.POST, request.FILES , instance=cart)

            if cart_formset.is_valid():
                cart_items = cart_formset.save(commit=False)
                for cart_item in cart_items:
                    cart_item.cart =  cart
                    cart_item.save()
                cart_formset.save()

                return redirect('cart-list')
    else:
        cart_form = CartForm(instance=cart)
        cart_formset = CartFormset(instance=cart)
    
    context = {
        'cart_form' : cart_form,
        'cart_formset': cart_formset,
        'cart' : cart
    }

    return render(request,'order_management/cart-edit.html', context)

def cart_delete(request, pk):
    cart = get_object_or_404(Cart, pk=pk)

    if request.method == "POST":
        cart.delete()
        
        return redirect('cart-list')
    context = {
        'cart': cart
    }

    return render(request,'order_management/cart-form.html' , context )

def cart_detail(request, pk):
    cart = get_object_or_404(Cart, pk=pk)

    # Fetch related attributes and images if needed
    cartitems = cart.cartitems.all()       # Fetching related product images
    context = {
        'cart': cart,
        'cartitem': cartitems,
      }

    return render(request, 'order_management/cart-details.html', context)

def order_detail_view(request, order_id):
    # Get the order by the `order_id` string
    order = get_object_or_404(Order, order_id=order_id)
    return render(request, 'order_management/order_details.html', {'order': order})

############################################################################
############################################################################
############################ API ###########################################
############################################################################
############################################################################
from django.db import transaction
from rest_framework.decorators import api_view ,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from .models import Cart, CartItems, Product, ProductAttribute, Order, Vendor, OrderItems
from .serializers import CartSerializer, AddToCartSerializer ,CouponValidationSerializer , OrderSerializer ,WishlistSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User  # Assuming you're using the default User model
User = get_user_model()

@api_view(['POST'])
def add_to_cart(request):
    serializer = AddToCartSerializer(data=request.data)

    if serializer.is_valid():
        product_id = serializer.validated_data['product_id']
        product_variant_id = serializer.validated_data['product_variant_id']
        quantity = serializer.validated_data['quantity']
        customer_id = serializer.validated_data.get('customer_id')  # Get customer_id from request, if provided

        # Ensure the customer is provided
        if not customer_id:
            return Response({"error": "Customer ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
            variant = ProductAttribute.objects.get(id=product_variant_id)  # Assuming you have a ProductAttribute model
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        except ProductAttribute.DoesNotExist:
            return Response({"error": "Product variant not found"}, status=status.HTTP_404_NOT_FOUND)

        # Since price is in the Product model, use product.price
        price = product.price

        # Check if there's an active cart for the customer
        try:
            cart = Cart.objects.get(customer_id=customer_id, status='activate')
        except Cart.DoesNotExist:
            # Create a new cart if none exists for the customer
            cart = Cart.objects.create(customer_id_id=customer_id, status='activate')
            request.session['cart_id'] = cart.cart_id

        # Add or update the cart item
        cart_item, item_created = CartItems.objects.get_or_create(
            cart=cart,
            product_id=product,
            product_variant_id=variant,
            defaults={'quantity': quantity, 'price': price}  # Use product.price here
        )

        if not item_created:
            # If the item already exists, update the quantity
            cart_item.quantity += int(quantity)
            cart_item.save()

        # Recalculate the total amount of the cart
        cart.calculate_total_amount()

        # Serialize and return the updated cart data
        cart_serializer = CartSerializer(cart)
        return Response(cart_serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_cart(request):
    customer_id = request.user.id  # Assuming the user is authenticated and user id is available
    
    try:
        # Get the active cart for the logged-in user
        cart = Cart.objects.get(customer_id=customer_id, status='activate')
    except Cart.DoesNotExist:
        return Response({"error": "No active cart found for this user."}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the cart data
    cart_serializer = CartSerializer(cart)
    
    return Response(cart_serializer.data, status=status.HTTP_200_OK)

#update the card form cart of the customer

@api_view(['POST', 'PUT'])
def update_cart(request):
    try:
        customer_id = request.user.id  # Ensure the user is authenticated
        cart_items_data = request.data.get('cartitems', [])
        removed_items = request.data.get('removedItems', [])  # Get removed items list

        # Get the active cart for the customer
        cart = Cart.objects.get(customer_id=customer_id, status='activate')

        # Remove cart items that were marked for removal
        if removed_items:
            CartItems.objects.filter(cart=cart, product_variant_id__in=removed_items).delete()

        # Update cart items' quantities
        for item_data in cart_items_data:
            product_variant_id = item_data.get('product_variant_id')
            quantity = item_data.get('quantity')

            try:
                # Find and update the corresponding cart item
                cart_item = CartItems.objects.get(cart=cart, product_variant_id=product_variant_id)
                cart_item.quantity = quantity
                cart_item.save()

            except CartItems.DoesNotExist:
                return Response({"error": f"Cart item with variant {product_variant_id} not found."}, status=status.HTTP_404_NOT_FOUND)

        # Recalculate the cart total after updating quantities and removing items
        cart.calculate_total_amount()

        return Response({"message": "Cart updated successfully."}, status=status.HTTP_200_OK)

    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def validate_coupon(request):
    """
    Validate the coupon and apply the discount to the cart items.
    """
    serializer = CouponValidationSerializer(data=request.data)
    
    if serializer.is_valid():
        # Update coupon usage if necessary
        coupon_code = serializer.validated_data['coupon_code']
        coupon = Coupon.objects.get(coupon_code=coupon_code)
        coupon.times_used += 1
        coupon.save()

        return Response({
            "discount": serializer.data['discount'],
            "total": serializer.data['total'],
            "coupon_code ": coupon.coupon_code,
            "coupon_id": coupon.id

        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def process_order(request):
    print("Raw Request Data:", request.data)

    # Extract main order data from the request payload
    order_data = {
        'customer_id': request.data.get('customer_id'),
        'payment_type': request.data.get('payment_type'),
        'shipping_address': request.data.get('shipping_address'),
        'shipping_city': request.data.get('shipping_city'),
        'shipping_postal_code': request.data.get('shipping_postal_code'),
        'order_note': request.data.get('order_note'),
        'total_amount': request.data.get('total_amount'),
        'sub_total': request.data.get('sub_total'),
    }

    print("Extracted Order Data:", order_data)

    try:
        with transaction.atomic():
            # Fetch the User instance (Customer) based on customer_id
            customer_user = User.objects.filter(id=order_data['customer_id']).first()
            if not customer_user:
                return Response({"error": "Customer not found"}, status=status.HTTP_400_BAD_REQUEST)

            # Fetch the coupon instance if coupon_id is provided
            coupon_id = request.data.get('coupon_id')
            coupon = None
            if coupon_id:
                coupon = get_object_or_404(Coupon, id=coupon_id)

            vendor_orders = request.data.get('vendor_orders')
            if not vendor_orders:
                return Response({"error": "Vendor orders not found"}, status=status.HTTP_400_BAD_REQUEST)

            created_order_ids = []  # Store created order IDs to return later

            # For each vendor, create a separate order and order items
            for vendor_order in vendor_orders:
                vendor_id = vendor_order.get('vendor_id')

                # Ensure that the vendor exists
                vendor = Vendor.objects.filter(user_id=vendor_id).first()
                if not vendor:
                    return Response({"error": f"Vendor with ID {vendor_id} not found"}, status=status.HTTP_400_BAD_REQUEST)

                # Create the order for each vendor
                vendor_order_instance = Order.objects.create(
                    customer_id=customer_user,
                    payment_type=order_data['payment_type'],
                    shipping_address=order_data['shipping_address'],
                    shipping_city=order_data['shipping_city'],
                    shipping_postal_code=order_data['shipping_postal_code'],
                    order_note=order_data['order_note'],
                    total_amount=order_data['total_amount'],
                    sub_total=order_data['sub_total'],
                    coupon_id=coupon if coupon and vendor.user == coupon.user else None,  # Use coupon_id, pass the Coupon instance
                    vendor=vendor
                )

                print("Created Order for Vendor:", vendor_order_instance)

                # Process each item in the vendor's order
                items = vendor_order.get('items', [])
                for item in items:
                    product_id = item.get('product_id')
                    product_variant_id = item.get('product_variant_id')
                    quantity = item.get('quantity')
                    price = item.get('price')

                    # Fetch the Product instance based on the product_id
                    product = Product.objects.filter(id=product_id).first()
                    if not product:
                        return Response({"error": f"Product with ID {product_id} not found"}, status=status.HTTP_400_BAD_REQUEST)

                    # Fetch the ProductAttribute instance based on the product_variant_id
                    product_attribute = ProductAttribute.objects.filter(id=product_variant_id).first()
                    if not product_attribute:
                        return Response({"error": f"Product variant with ID {product_variant_id} not found"}, status=status.HTTP_400_BAD_REQUEST)

                    # Create order items
                    order_item = OrderItems.objects.create(
                        order=vendor_order_instance,
                        product_id=product,
                        product_variant_id=product_attribute,
                        quantity=quantity,
                        price=price,
                        subtotal=quantity * price
                    )

                    print("Created Order Item for Vendor:", order_item)

                created_order_ids.append(vendor_order_instance.order_id)
            
            # Correct the field name from 'user' to 'customer' in the CartItems deletion
                        # Locate the active cart and delete associated CartItems
            active_cart = Cart.objects.filter(customer_id=customer_user).first()
            if active_cart:
                CartItems.objects.filter(cart=active_cart).delete()
                active_cart.save()
                print('###############################################33')

            # Return the list of order IDs for each vendor after successful creation
            return Response({"order_ids": created_order_ids}, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        print("Order processing failed:", str(e))
        return Response({"error": "Order processing failed", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_detail(request, id):
    try: 
        order = Order.objects.get(id = id, customer_id = request.user)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status= status.HTTP_404_NOT_FOUND)
    
    serializer = OrderSerializer(order)
    return Response(serializer.data, status = status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_customer_orders(request):
    customer = request.user  # Assuming the user is authenticated and represents the customer
    orders = Order.objects.filter(customer_id=customer)
    
    # Serialize the orders and include related order items
    serializer = OrderSerializer(orders, many=True)
    print(serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_wishlist(request):
    customer = request.user
    product_id = request.data.get('product_id')

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    
    wishlist_item, created = Wishlist.objects.get_or_create(customer=customer, product=product)

    if created:
        return Response({"message": "Product added to wishlist"}, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "Product already in wishlist"}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_wishlist(request, product_id):
    customer = request.user

    try:
        wishlist_item = Wishlist.objects.get(customer=customer, product_id=product_id)
        wishlist_item.delete()
        return Response({"message": "Product removed from wishlist."}, status=status.HTTP_200_OK)
    except Wishlist.DoesNotExist:
        return Response({"error": "Product not in wishlist."}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_wishlist(request):
    customer = request.user
    wishlist_items = Wishlist.objects.filter(customer=customer)
    serializer = WishlistSerializer(wishlist_items, many=True)
    return Response(serializer.data)