from rest_framework.permissions import BasePermission


class IsAllowedToWriteRoom(BasePermission):
    def has_permission(self, request, view):
        return request.user.role in ['ceo', 'it', 'manager']

    def has_object_permission(self, request, view, obj):
        return (
            request.user.role in ['ceo', 'it', 'manager'] and
            request.user.hotel == obj.hotel
        )
