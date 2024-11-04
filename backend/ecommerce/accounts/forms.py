from django import forms
from .models import User, Vendor
from django.contrib.auth.forms import AuthenticationForm


#Registration form
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


#login form

class CustomLoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Username'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Password'}))

    # Role selection field
    role = forms.ChoiceField(choices=[
        ('vendor', 'Vendor'),
        ('admin', 'Admin'),
    ], widget=forms.Select(attrs={'class': 'form-control'}))
   
