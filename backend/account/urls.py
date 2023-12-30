from django.urls import path, include
from .views import (
    UserView,
    UserDetailView,
    UserHotelDetailView,
    UserHotelListView,
    SetPasswordView,
    ResetPassword,
    ResetPasswordConfirm,
    AccountActivationView,
    InnEaseTokenOptainPairView,
    InnEaseTokenRefreshView,
    InnEaseTokenVerifyView,
    InnEaseLogoutView,
)


urlpatterns = [
    path("", UserView.as_view()),
    path("activate/", AccountActivationView.as_view()),
    path("login/", InnEaseTokenOptainPairView.as_view()),
    path("refresh/", InnEaseTokenRefreshView.as_view()),
    path("verify/", InnEaseTokenVerifyView.as_view()),
    path("logout/", InnEaseLogoutView.as_view()),
    path("me/", UserDetailView.as_view()),
    path("set-password/", SetPasswordView.as_view()),
    path("reset-password/", ResetPassword.as_view()),
    path("confirm-reset-password/", ResetPasswordConfirm.as_view(),
         name="password_reset_confirm"),
    path("hotel/", UserHotelListView.as_view()),
    path("hotel/<str:id>/", UserHotelDetailView.as_view())
]
