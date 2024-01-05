from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
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

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.room.status = "maintanance"
        obj.room.save()
        return super().destroy(request, *args, **kwargs)
