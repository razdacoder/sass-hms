from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Room
from .serializers import RoomSerializer
from .permissions import IsAllowedToWrite


class RoomViewset(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(hotel=self.request.user.hotel)

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'partial_update']:
            return [IsAuthenticated()]
        else:
            return [IsAuthenticated(), IsAllowedToWrite()]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context
