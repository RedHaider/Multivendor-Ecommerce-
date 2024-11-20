from django.contrib.auth.views import PasswordResetView
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.shortcuts import render,  redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth.views import PasswordResetConfirmView


@login_required
def dashboard(request):
    if request.user.role == 'admin':
        return render(request, 'index.html')
    elif request.user.role == 'vendor':
        return render(request, 'index.html')
    else:
        return redirect('login')

@login_required
def product_management(request):
    return render(request, 'product_management.html')

def sales_performance(request):
    return render(request, 'sales_performance_analysis.html')

def promotion_discount(request):
    return render(request, 'promotion_discount.html')

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


def coupon_edit(request):
    return render(request, 'pages/coupon-edit.html')

def vendor_edit(request):
    return render(request, 'pages/vendor-edit.html')

def commission_edit(request):
    return render(request, 'pages/commission-edit.html')


class VendorPasswordResetForm(PasswordResetForm):
    def get_users(self, email):
        """
        Given an email, return matching active users with that email address.
        Filters by role='vendor' if the role field exists in the user model.
        """
        User = get_user_model()  # Use the custom user model
        active_users = User.objects.filter(email=email, is_active=True)
        # If 'role' is a field in the custom user model, filter by role='vendor'
        if hasattr(User, 'role'):
            active_users = active_users.filter(role='vendor')
        return active_users


class VendorPasswordResetView(PasswordResetView):
    form_class = VendorPasswordResetForm
    template_name = 'registration/password_reset_form.html'

class CustomSetPasswordForm(SetPasswordForm):
    def save(self, commit=True):
        user = super().save(commit=False)
        new_password = self.cleaned_data["new_password1"]
        print(f"Setting new password for user: {user.email}, Password: {new_password}")
        user.set_password(new_password)
        if commit:
            user.save()
            print(f"Password successfully saved for user: {user.email}")
        return user


class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    form_class = CustomSetPasswordForm

    def form_valid(self, form):
        print("Form is valid. Attempting to save the new password.")
        user = form.save()
        print(f"Password reset confirmed for user: {user.email}")
        return super().form_valid(form)

    def form_invalid(self, form):
        print(f"Form is invalid: {form.errors}")
        return super().form_invalid(form)