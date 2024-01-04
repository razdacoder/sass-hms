from rest_framework import serializers
from .models import Guest, Booking
from rooms.serializers import RoomSerializer
from rooms.models import Room
from .utils import calculate_total_price


class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = ['id', 'fullName', 'email', 'hotel']
        extra_kwargs = {'hotel': {'read_only': True}}

    def create(self, validated_data):
        user = self.context['user']
        validated_data['hotel'] = user.hotel
        return super().create(validated_data)


class BookingSerializer(serializers.ModelSerializer):
    guest = GuestSerializer()
    room = RoomSerializer(read_only=True)
    room_type = serializers.CharField(max_length=20, write_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'check_in_date', 'check_out_date',
                  'guest',
                  'room',
                  'room_type',
                  'number_of_guests', 'special_requests', 'total_cost', 'isPaid', 'booking_status', 'created_at', 'updated_at']
        extra_kwargs = {"total_cost": {"read_only": True}}

    def create(self, validated_data):
        room_type = validated_data.get('room_type')
        number_of_guests = validated_data.get('number_of_guests')
        check_in_date = validated_data.get('check_in_date')
        check_out_date = validated_data.get('check_out_date')
        booking_status = validated_data.get('booking_status')
        guest_obj = validated_data.get('guest')

        room = Room.objects.filter(
            room_type=room_type, max_capacity__gte=number_of_guests, status="available").first()
        guest, created = Guest.objects.get_or_create(email=guest_obj['email'], hotel=room.hotel, defaults={
            "fullName": guest_obj["fullName"]})

        price = room.discount_price if room.discount_price > 0 else room.price
        print(price)
        total_cost = calculate_total_price(
            check_in_date, check_out_date, price)
        status = "reserved" if booking_status == "unconfirmed" else "occupied"
        room.status = status
        room.save()
        return Booking.objects.create(
            check_in_date=check_in_date,
            check_out_date=check_out_date,
            number_of_guests=number_of_guests,
            booking_status=booking_status,
            isPaid=validated_data.get('isPaid'),
            special_requests=validated_data.get('special_requests'),
            total_cost=total_cost,
            room=room,
            guest=guest,
        )
