from rest_framework.routers import DefaultRouter
from .views import RoomViewset

router = DefaultRouter()
router.register("", RoomViewset, "rooms")

urlpatterns = router.urls
