# Generated by Django 5.0 on 2024-01-04 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0004_alter_booking_special_requests'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='total_cost',
            field=models.FloatField(),
        ),
    ]
