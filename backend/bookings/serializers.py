from rest_framework import serializers
from .models import Guest, Booking
from rooms.serializers import RoomSerializer


class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = ['id', 'fullName', 'email', 'phoneNumber', 'hotel']
        extra_kwargs = {'hotel': {'write_only': True}}

    def create(self, validated_data):
        user = self.context['user']
        validated_data['hotel'] = user.hotel
        return super().create(validated_data)


class BookingSerializer(serializers.ModelSerializer):
    guest = GuestSerializer()
    room = RoomSerializer()

    class Meta:
        model = Booking
        fields = ['id', 'check_in_date', 'check_out_date',
                  'guest',
                  'room',
                  'number_of_guests', 'special_requests', 'total_cost', 'isPaid', 'booking_status', 'created_at', 'updated_at']
