import uuid
from django.db import models
from account.models import Hotel


class Room(models.Model):
    ROOM_STATUS_CHOICES = [
        ('available', 'Available'),
        ('booked', 'Booked'),
        ('maintenance', 'Maintenance'),
        ('reserved', 'Reserved'),
    ]
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    hotel = models.ForeignKey(
        Hotel, related_name='hotel_room', on_delete=models.CASCADE)
    room_number = models.CharField(max_length=10, unique=True)
    room_type = models.CharField(max_length=50)
    image = models.ImageField(upload_to="room_images/", null=True, blank=True)
    max_capacity = models.IntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    discount_price = models.DecimalField(
        max_digits=8, decimal_places=2, default=0.00)
    status = models.CharField(
        max_length=20, choices=ROOM_STATUS_CHOICES, default="available")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Room {self.room_number} - {self.room_type}"
