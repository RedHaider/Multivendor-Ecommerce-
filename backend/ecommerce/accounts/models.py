from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator


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
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
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
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('others', 'Others'),
    )

    user = models.OneToOneField(User, on_delete = models.CASCADE, related_name='customer_profile')
    name = models.CharField(max_length=150,  blank=True)
    customerID = models.CharField(max_length=15, unique=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    division = models.CharField(max_length=100, null=True, blank=True)
    district = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    Thana = models.CharField(max_length=150, blank=True )
    postal_code = models.CharField(max_length= 150, blank = True)
    created_at = models.DateTimeField(auto_now_add=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='active', null=True,)
    

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
        super().save(*args, **kwargs)




class Vendor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='vendor_profile')
    vendorID = models.CharField(max_length=15, unique=True, blank=True)
    business_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    logo = models.ImageField(upload_to='vendor_logos/', blank=True, default='vendor_logos/default_logo.jpeg')
    banner = models.ImageField(upload_to='vendor_banners/',blank=True, default='vendor_logos/default_banner.jpeg' )
    store_description = models.TextField(null=True, blank=True)
    division = models.CharField(max_length=100, null=True, blank=True)
    district = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    business_license_no = models.CharField(max_length=100, null=True, blank=True)
    facebook = models.URLField(null=True, blank=True)
    instagram = models.URLField(null=True, blank=True)
    contact_number = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def generate_vendor_id(self):
        last_vendor = Vendor.objects.order_by('-id').first()
        if last_vendor:
            last_number = int(last_vendor.vendorID[3:])
        else:
            last_number = 0
        new_number = last_number + 1
        return f"VEN{new_number:09d}"

    def save(self, *args, **kwargs):
        if not self.vendorID:
            self.vendorID = self.generate_vendor_id()
        if not self.address:
            self.address = f"{self.user.address}"
        if not self.phone_number:
            self.phone_number = f"{self.user.phone}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Vendor: {self.user.first_name} {self.user.last_name} ({self.vendorID})"

    
    # VendorRating model

class VendorRating(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name='ratings')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

#admin
    
class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin_profile')
    adminID = models.CharField(max_length=15, unique=True, blank=True)
    role = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Admin: {self.user.first_name} {self.user.last_name} ({self.adminID})"
    
    def generate_admin_id(self):
        last_admin = Admin.objects.order_by('-id').first()
        if last_admin:
            last_number = int(last_admin.adminID[3:])
        else:
            last_number = 0
        new_number = last_admin +1
        return f"ADM{new_number:09d}"
    
    def save(self, *args, **kwargs):
        if not self.adminID:
            self.adminID = self.generate_admin_id()
        if not self.created_at:
            self.created_at = f"{self.user.created_at}"
        if not self.role:
            self.role = f"{self.user.role}"
        super().save(*args, **kwargs)
