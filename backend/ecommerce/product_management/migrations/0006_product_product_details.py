# Generated by Django 5.1.2 on 2024-10-19 11:28

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product_management', '0005_producttype_category_product_type_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='product_details',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
    ]
