from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS


class CurrentUserOrAdmin(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        user = request.user
        return user.is_staff or obj.pk == user.pk


class CurrentUserOrAdminOrReadOnly(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        user = request.user
        if type(obj) == type(user) and obj == user:
            return True
        return request.method in SAFE_METHODS or user.is_staff


class IsCEOorITStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the necessary roles (CEO or IT)
        return request.user.role in ['ceo', 'it']

    def has_object_permission(self, request, view, obj):
        # Check if the user has the necessary roles (CEO or IT) and belongs to the same hotel
        return (
            request.user.role in ['ceo', 'it'] and
            request.user.hotel == obj.hotel
        )
