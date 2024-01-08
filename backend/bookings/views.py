from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import GuestSerializer, BookingSerializer
from .models import Guest, Booking
from rooms.permissions import IsAllowedToWrite


class GuestViewset(ModelViewSet):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = super().get_queryset()
        return queryset.filter(hotel=user.hotel)


class BookingViewset(ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = super().get_queryset()
        return queryset.filter(room__hotel=user.hotel)

    @action(methods=["PATCH"], detail=True)
    def check_in(self, request, pk=None):
        booking = self.get_object()
        booking.isPaid = request.data["isPaid"]
        booking.booking_status = "checked-in"
        booking.room.status = "occupied"
        booking.room.save()
        booking.save()
        serializer = BookingSerializer(booking, many=False)
        return Response(serializer.data)

    @action(methods=["PATCH"], detail=True)
    def check_out(self, request, pk=None):
        booking = self.get_object()
        booking.isPaid = request.data["isPaid"]
        booking.booking_status = "checked-out"
        booking.room.status = "maintanance"
        booking.room.save()
        booking.save()
        serializer = BookingSerializer(booking, many=False)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.room.status = "maintanance"
        obj.room.save()
        return super().destroy(request, *args, **kwargs)
