from django import forms
from .models import User, Vendor

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)


    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone', 'address', 'password', 'photo']

class VendorRegistrationForm(forms.ModelForm):
    class Meta:
        model = Vendor
        fields = ['business_name', 'phone_number',         'address', 'logo', 'banner', 
                  'store_description', 'division', 'district', 'state', 
                  'business_license_no', 'facebook', 'instagram', 'contact_number']
