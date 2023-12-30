# Generated by Django 5.0 on 2023-12-30 20:11

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('account', '0002_alter_user_role'),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('room_number', models.CharField(max_length=10, unique=True)),
                ('room_type', models.CharField(max_length=50)),
                ('image', models.ImageField(blank=True, null=True, upload_to='room_images/')),
                ('max_capacity', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('discount_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=8)),
                ('status', models.CharField(choices=[('available', 'Available'), ('booked', 'Booked'), ('maintenance', 'Maintenance'), ('reserved', 'Reserved')], default='available', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('hotel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hotel_room', to='account.hotel')),
            ],
        ),
    ]