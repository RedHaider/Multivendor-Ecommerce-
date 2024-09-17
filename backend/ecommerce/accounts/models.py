from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone



# The user table integrated
class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('vendor', 'Vendor'),
        ('customer', 'Customer'),
    )

    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    photo = models.ImageField(upload_to='profile_photos/', null=True, blank=True)  # Profile photo
    email_verified_at = models.DateTimeField(null=True, blank=True)  # Track email verification time
    remember_token = models.CharField(max_length=100, null=True, blank=True)  # Custom remember me token
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set at creation
    updated_at = models.DateTimeField(auto_now=True)  # Automatically updated when saved

    USERNAME_FIELD = 'email'  # Use email instead of username for login
    REQUIRED_FIELDS = ['username']  # Username is required for creating a superuser

    def __str__(self):
        return self.email

#customer 
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE, related_name='customer_profile')
    name = models.CharField(max_length=150,  blank=True)
    customerID = models.CharField(max_length=15, unique=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def generate_customer_id(self):
        last_customer = Customer.objects.order_by('-id').first()
        if last_customer:
            last_number = int(last_customer.customerID[3:])
        else: 
            last_number = 0
        new_number = last_number + 1
        return f"CUS{new_number:09d}"
    
    def __str__(self) -> str:
        return f"Customer: {self.user.first_name} {self.user.last_name} ({self.customerID})"
    
    def save(self, *args, **kwargs):
        if not self.customerID :
            self.customerID = self.generate_customer_id()
        if not self.name:
            self.name = f"{self.user.first_name} {self.user.last_name}"
        if not self.address:
            self.address = self.user.address
        if not created_at:
            created_at = self.user.created_at
        super().save(*args, **kwargs)

    
#vendor
class Vendor(models.Model):
    user = models.OneToOneField(User, on_delete= models.CASCADE, related_name='vednor_profile')
    VendorID = models.CharField(max_length=15, uniquq=True, blank=True)
    business_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def generate_vendor_id(self):
        last_vendor = Vendor.objects.order_by('-id').first()
        if last_vendor:
            last_number = int(last_vendor.VendorID[3:])
        else:
            last_number = 0
        new_number = last_vendor +1
        return f"VEN{new_number:09d}"

    def __str__(self) -> str:
        return f"Vendor: {self.user.first_name} {self.user.last_name} ({self.customerID})"
    
    def save(self, *args, **kwargs):
        if not self.VendorID:
            self.customerID = self.generate_vendor_id()
        if not self.address:
            self.address = f"{self.user.address}"
        if not self.phone_number:
            self.phone_number = f"{self.user.phone}"
        if not self.created_at:
            self.created_at = f"{self.user.created_at}"
        super().save(*args, **kwargs)
    
#admin