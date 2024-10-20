# Generated by Django 5.1.1 on 2024-10-02 05:05

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product_management', '0004_product_sku'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cart_id', models.CharField(blank=True, max_length=15, unique=True)),
                ('total_amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('customer_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CartItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('cart_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='order_management.cart')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product_management.product')),
                ('product_variant_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product_management.productattribute')),
            ],
        ),
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coupon_code', models.CharField(max_length=20, unique=True)),
                ('coupon_discount', models.DecimalField(decimal_places=2, max_digits=5)),
                ('coupon_validity', models.DateField()),
                ('status', models.CharField(choices=[('active', 'ACTIVE'), ('deactivate', 'DEACTIVATE'), ('expired', 'EXPIRED')], default='active', max_length=20)),
                ('usage_type', models.CharField(choices=[('infinity', 'Unlimited Use'), ('fixed', 'Fixed Number of Uses'), ('timed', 'Fixed Time Period')], default='fixed', max_length=20)),
                ('usage_limit', models.IntegerField(blank=True, null=True)),
                ('times_used', models.IntegerField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_id', models.CharField(blank=True, max_length=15, unique=True)),
                ('order_date', models.DateTimeField(auto_now_add=True)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=15)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('processing', 'Processing'), ('complete', 'Complete'), ('cancelled', 'Cancelled')], default='pending', max_length=20)),
                ('payment_type', models.CharField(max_length=20)),
                ('shipping_address', models.CharField(max_length=255)),
                ('shipping_city', models.CharField(max_length=100)),
                ('shipping_postal_code', models.CharField(max_length=10)),
                ('coupon_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='order_management.coupon')),
                ('customer_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('subtotal', models.DecimalField(decimal_places=2, max_digits=15)),
                ('order_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='order_management.order')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product_management.product')),
                ('product_variant_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='product_management.productattribute')),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_id', models.CharField(blank=True, max_length=15, unique=True)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('payment_method', models.CharField(choices=[('cash', 'Cash on Delivery'), ('paymentgateway', 'Payment Gate-Way')], max_length=20)),
                ('payment_date', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('paid', 'PAID'), ('pending', 'PENDING'), ('failed', 'FAILED')], max_length=20)),
                ('order_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='order_management.order')),
            ],
        ),
    ]
