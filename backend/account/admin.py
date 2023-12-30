from django.contrib import admin
from .models import Hotel, User
from django.contrib.auth.models import Group
# Register your models here.

admin.site.register(Hotel)
admin.site.register(User)
admin.site.unregister(Group)
