# Generated by Django 5.0 on 2023-12-31 11:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='booking',
            old_name='payment_status',
            new_name='isPaid',
        ),
    ]