
# Register your models here.
from django.contrib import admin
from .models import User , Admin, Customer, Vendor, VendorRating

admin.site.register(Admin)
admin.site.register(Customer)
admin.site.register(Vendor)
admin.site.register(VendorRating)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'role', 'status', 'phone')
    search_fields = ('email', 'role')