# Generated by Django 5.1.1 on 2024-10-03 08:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order_management', '0003_rename_order_id_orderitems_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitems',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orderitems', to='order_management.order'),
        ),
    ]
