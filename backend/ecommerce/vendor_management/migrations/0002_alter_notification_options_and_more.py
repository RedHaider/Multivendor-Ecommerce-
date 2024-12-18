# Generated by Django 5.1.2 on 2024-12-03 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendor_management', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notification',
            options={'ordering': ['-created_at']},
        ),
        migrations.AddField(
            model_name='notification',
            name='notification_type',
            field=models.CharField(choices=[('order', 'Order'), ('review', 'Review'), ('message', 'Message'), ('alert', 'Alert'), ('other', 'Other')], default='other', max_length=50),
        ),
        migrations.AddField(
            model_name='notification',
            name='related_object_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
