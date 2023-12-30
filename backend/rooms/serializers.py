from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'hotel', 'room_number', 'room_type',
                  'max_capacity', 'price', 'discount_price', 'status', 'created_at']
        extra_kwargs = {'hotel': {'read_only': True}, }

    def create(self, validated_data):
        user = self.context['user']
        validated_data['hotel'] = user.hotel
        return super().create(validated_data)
