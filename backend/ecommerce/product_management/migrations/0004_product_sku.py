# Generated by Django 5.1.1 on 2024-10-01 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product_management', '0003_product_in_stock'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='sku',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
