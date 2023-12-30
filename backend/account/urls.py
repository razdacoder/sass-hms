from django.urls import path, include
from .views import (
    UserView,
    AccountActivationView,
    InnEaseTokenOptainPairView
)


urlpatterns = [
    path("", UserView.as_view()),
    path("activate/", AccountActivationView.as_view()),
    path("login/", InnEaseTokenOptainPairView.as_view())
]
