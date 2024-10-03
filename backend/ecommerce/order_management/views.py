from django.shortcuts import render, redirect, get_object_or_404

from django.contrib import messages
from .forms import CouponForm ,OrderForm  , OrderItemForm , OrderFormset ,Cart ,CartForm, CartFormset
from .models import Order, OrderItems, Cart ,CartItems ,Coupon, Payment

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
    order = Order.objects.all()
    return render(request,'order_management/order.html' , {'order':order})

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


def cart_list(request):
    cart = Cart.Objects.all()
    context = {
        'cart': cart,
    }
    return render(request, 'order_management/cart.html', context)

def cart_form(request, pk):
    if request.method == 'POST':
        cart_form = CartForm(request.POST , request.FILES)

        if cart_form.is_valid():
            print("the form is valid")
            
            cart = cart_form.save(commit=False)
            cart.save()

            cart_formset = CartFormset(request.POST, request.FILES, instance=cart)

            if cart_formset.is_valid():
                cart_items = cart_formset.save(commit=False)
                for cart_item in cart_items:
                    cart_item.cart_id = cart
                    cart_item.save()
                cart_formset.save()
                return redirect('')
    
    else: 
        cart_form = CartForm()
        cart_formset = CartFormset(queryset=OrderItems.objects.none(), instance= None)
    
    context = {
        'cart_form' : cart_form,
        'cart_formset' : cart_formset
    }

    return render(request, '', context)


##edit and delete is left 
##url is left 
##ui is left 




