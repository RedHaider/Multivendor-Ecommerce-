#accounts/views.py
from django.shortcuts import render,  redirect
from django.contrib.auth.decorators import login_required
from .decorators import check_role
from .models import  User
from django.contrib import messages

# Create your views here.

@login_required
@check_role('admin')
def admin_dashboard(request):
    return render(request, 'admin_dashboard.html')

@login_required
@check_role('vendor')
def vendor_dashboard(request):
    return render(request, 'vendor_dashboard.html')

@login_required
@check_role('customer')
def customer_dashboard(request):
    return render(request, 'customer_dashboard.html')



from .forms import UserRegistrationForm, VendorRegistrationForm





def vendor_registration_view(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST, request.FILES)
        vendor_form = VendorRegistrationForm(request.POST, request.FILES)

        if user_form.is_valid() and vendor_form.is_valid():
            email = user_form.cleaned_data['email']
            username = email.split('@')[0]  # Default username from email

            # Ensure unique username
            counter = 1
            original_username = username
            while User.objects.filter(username=username).exists():
                username = f"{original_username}{counter}"
                counter += 1

            # Create user but don't save to the database yet
            user = user_form.save(commit=False)
            user.username = username  # Set the unique username
            user.role = 'vendor'  # Ensure the role is set to 'vendor'
            user.set_password(user_form.cleaned_data['password'])  # Set the password
            user.save()

            # Create vendor profile
            vendor = vendor_form.save(commit=False)
            vendor.user = user  # Link vendor to user
            vendor.save()

            messages.success(request, "Vendor registration successful!")
            return redirect('login')  # Replace 'success_url' with your actual success page

    else:
        user_form = UserRegistrationForm()
        vendor_form = VendorRegistrationForm()

    return render(request, 'vendor_registration.html', {'user_form': user_form, 'vendor_form': vendor_form})