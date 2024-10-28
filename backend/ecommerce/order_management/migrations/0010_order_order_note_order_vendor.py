# Generated by Django 5.1.2 on 2024-10-27 07:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_rename_city_customer_thana'),
        ('order_management', '0009_alter_cart_customer_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='order_note',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='vendor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.vendor'),
        ),
    ]