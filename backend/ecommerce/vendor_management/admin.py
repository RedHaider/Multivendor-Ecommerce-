from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Notification, VendorNotification

admin.site.register(Notification)
admin.site.register(VendorNotification)