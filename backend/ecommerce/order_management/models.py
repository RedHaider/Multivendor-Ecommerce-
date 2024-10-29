from django.db import models
from product_management.models import Product , ProductAttribute
from accounts.models import Vendor
from django.conf import settings
from django.utils import timezone
# Create your mode

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending','Pending'),
        ('processing','Processing'),
        ('complete','Complete'),
        ('cancelled','Cancelled')
    ]

    order_id = models.CharField(max_length=15, unique=True, blank=True )
    customer_id = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete= models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    sub_total = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    total_amount = models.DecimalField(max_digits=15, decimal_places=2 )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_type = models.CharField(max_length=20)
    coupon_id = models.ForeignKey('Coupon', on_delete = models.SET_NULL, null=True, blank=True)
    shipping_address = models.CharField(max_length=255)
    shipping_city = models.CharField(max_length=100)
    shipping_postal_code = models.CharField(max_length=10)
    order_note = models.TextField(blank=True, null=True)
    vendor = models.ForeignKey(Vendor, on_delete = models.SET_NULL, null=True, blank=True)

    def generate_order_id(self):
        last_order = Order.objects.order_by('-id').first()
        if last_order:
            last_number = int(last_order.order_id[3:])
        else:
            last_number = 0
        new_number = last_number + 1
        return f"ORD{new_number:09d}"

    def save(self, *args, **kwargs):
        if not self.order_id:
            self.order_id = self.generate_order_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Order {self.order_id} by {self.customer_id.username}' 
    
class OrderItems(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='orderitems')
    product_id = models.ForeignKey(
        Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    product_variant_id = models.ForeignKey(
        ProductAttribute, on_delete=models.CASCADE, null=True, blank=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(
        max_digits=15, decimal_places=2)  # quantity * price

    def save(self, *args, **kwargs):
        self.subtotal = self.quantity * self.price
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Item {self.order.order_id} for Order {self.id}'
    
    class Meta:
        verbose_name = 'OrderItem'
        verbose_name_plural = 'OrderItems'
        ordering = ['-id']
    
class Payment(models.Model):
    PAYMENT_METHODS = [
        ('cash','Cash on Delivery'),
        ('paymentgateway', 'Payment Gate-Way')
    ]

    PAYMENT_STATUS = [
        ('paid','PAID'),
        ('pending','PENDING'),
        ('failed','FAILED')
    ]

    payment_id = models.CharField(max_length=15, unique=True, blank=True)
    order_id = models.ForeignKey(Order, on_delete= models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices= PAYMENT_METHODS)
    payment_date = models.DateTimeField(auto_now_add=True)
    status =  models.CharField(max_length=20, choices=PAYMENT_STATUS)

    def generate_payment_id(self):
        last_payment = Payment.objects.order_by('-id').first()
        if last_payment:
            last_number = int(last_payment.payment_id[3:])
        else:
            last_number = 0
        new_number = last_number + 1
        return f"PMT{new_number:09d}"

    def save(self, *args, **kwargs):
        if self.amount <= 0:
            raise ValueError("Payment amount must be greater than zero.")
        if not self.payment_id:
            self.payment_id = self.generate_payment_id()
        super().save(*args, **kwargs)


class Coupon(models.Model):
    COUPON_STATUS = [
        ('active','ACTIVE'),
        ('deactivate','DEACTIVATE'),
        ('expired','EXPIRED'),
    ]

    USAGE_TYPES = [
        ('infinity', 'Unlimited Use'),
        ('fixed', 'Fixed Number of Uses'),
        ('timed', 'Fixed Time Period')
    ]

    coupon_code = models.CharField(max_length=20, unique=True)
    coupon_name = models.CharField(max_length=15 , blank=True, null=True , default='New Name')
    coupon_discount = models.DecimalField(max_digits=5, decimal_places=2)
    coupon_validity = models.DateField()
    status = models.CharField(max_length=20, choices=COUPON_STATUS, default='active')
    user = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete= models.CASCADE) #one who added the coupon
    usage_type = models.CharField(max_length=20, choices=USAGE_TYPES, default='fixed')  # Type of coupon usage
    usage_limit = models.IntegerField(null=True, blank=True)  # Relevant for fixed coupons
    times_used = models.IntegerField(default=0)
    def save(self, *args, **kwargs):
        if self.usage_type == 'fixed' and self.times_used >= self.usage_limit:
            raise ValueError("Coupon usage limit reached.")
        elif self.usage_type == 'timed' and self.coupon_validity and timezone.now().date() > self.coupon_validity:
            raise ValueError("Coupon has expired.")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.coupon_code

class Cart(models.Model):
    STATUS_CHOICE = [
        ('acitvate', 'ACTIVATE'),
        ('completed', 'COMPLETED')
    ]


    cart_id = models.CharField(max_length=15, unique=True, blank=True)
    customer_id = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        null=True,  # Allow NULL values
        blank=True  # Allow blank values in forms
        )
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=10, choices= STATUS_CHOICE, default='activate')

    def generate_cart_id(self):
        last_cart = Cart.objects.order_by('-id').first()  # Fixing the reference to Cart instead of Payment
        if last_cart:
            last_number = int(last_cart.cart_id[3:])
        else:
            last_number = 0
        new_number = last_number + 1
        return f"CRT{new_number:09d}"

    def calculate_total_amount(self):
        # Update to use 'cartitems' (related_name) instead of 'cartitems_set'
        total = sum(item.quantity * item.price for item in self.cartitems.all())
        self.total_amount = total
        self.save()

    def save(self, *args, **kwargs):
        if not self.cart_id:
            self.cart_id = self.generate_cart_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Cart {self.cart_id} for Customer {self.customer_id.username}'
    



class CartItems(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cartitems')
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_variant_id = models.ForeignKey(ProductAttribute, on_delete=models.CASCADE)  # Assuming you have variants
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # Add this field if you want to store subtotal


    def save(self, *args, **kwargs):
        self.subtotal = self.quantity * self.price
        super().save(*args, **kwargs)

    def __str__(self):
        return f'CI {self.cart.cart_id} CT:  {self.product_id} PR: {self.product_id}'

    class Meta:
        verbose_name = 'Cart Item'
        verbose_name_plural = 'Cart Item'
        ordering = ['-id']