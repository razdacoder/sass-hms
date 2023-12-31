from rest_framework.routers import DefaultRouter
from .views import GuestViewset, BookingViewset


router = DefaultRouter()
router.register("guests", GuestViewset, "guests")
router.register("bookings", BookingViewset, "bookings")

urlpatterns = router.urls
