import uuid
from django.db import models
from account.models import Hotel
from rooms.models import Room


class Guest(models.Model):
    TITLE = [
        ('none', 'None'),
        ('mr', 'Mr'),
        ('mrs', 'Mrs'),
        ('miss', 'Miss'),
    ]
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    title = models.CharField(max_length=5, choices=TITLE, default='none')
    fullName = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phoneNumber = models.CharField(max_length=15)
    hotel = models.ForeignKey(
        Hotel, related_name="hotel_guests", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Booking(models.Model):
    BOOKING_STATUS = [
        ('unconfirmed', 'Unconfirmed'),
        ('checked-in', 'Checked in'),
        ('checked-out', 'Checked out')
    ]

    room = models.ForeignKey(
        Room, related_name="booking_room", on_delete=models.CASCADE)
    guest = models.ForeignKey(
        Guest, related_name="booking_guest", on_delete=models.CASCADE)
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    number_of_guests = models.SmallIntegerField()
    special_requests = models.TextField(null=True, blank=True)
    total_cost = models.DecimalField(max_digits=8, decimal_places=2)
    isPaid = models.BooleanField()
    booking_status = models.CharField(max_length=20,
                                      choices=BOOKING_STATUS, default='unconfirmed')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Booking #{self.pk}"
