from datetime import timedelta
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.generics import ListCreateAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.decorators import APIView

from django.core.signing import TimestampSigner
from rest_framework_simplejwt.tokens import RefreshToken

from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from .permissions import CurrentUserOrAdmin, CurrentUserOrAdminOrReadOnly, IsCEOorITStaff

from .models import User, Hotel
from .serializers import (UserSerializer, ActivationSerializer,
                          UserDeleteSerializer,
                          SetPasswordSerializer,
                          ResetPasswordSerializer,
                          ResetPasswordConfirmSerializer, UserUpdateSerializer, UserHotelSerializer)
from .utils import generate_otp, send_otp_email, send_password_reset_email

# Create your views here.


signer = TimestampSigner()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        re_password = request.data.get("re_password")
        name = request.data.get("name")
        hotel = request.data.get("hotel")
        if User.objects.filter(email=email).exists():
            return Response({"message": "Account with email already exists."}, status=status.HTTP_400_BAD_REQUEST)
        if password != re_password:
            return Response({'message': "Passwords do no match!!"}, status=status.HTTP_400_BAD_REQUEST)
        activation_code = generate_otp()
        activation_token = signer.sign_object({"email": email, "name": name,
                                               "password": password, "hotel": hotel, "activation_code": activation_code})
        send_otp_email(email=email, name=name,
                       otp=activation_code)
        return Response({"message": "Check your email for account activation.", "activation_token": activation_token}, status=status.HTTP_200_OK)


class AccountActivationView(CreateAPIView):
    serializer_class = ActivationSerializer

    def create(self, request, *args, **kwargs):
        activation_token = request.data.get("activation_token")
        activation_code = request.data.get("activation_code")
        try:
            data = signer.unsign_object(
                activation_token, max_age=timedelta(minutes=10))
        except Exception as e:
            return Response({"message": "OTP has expired! Try registering again."}, status=status.HTTP_400_BAD_REQUEST)
        if data["activation_code"] != activation_code:
            return Response({"message": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        hotel = Hotel.objects.create(**data["hotel"])
        user = User.objects.create_user(
            email=data["email"], password=data["password"], name=data["name"], role="ceo", hotel=hotel)

        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class InnEaseTokenOptainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=access_token,
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_REFRESH_COOKIE'],
                value=refresh_token,
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']

            )

        return response


class InnEaseTokenRefreshView(TokenRefreshView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        refresh_token = request.COOKIES.get(
            settings.SIMPLE_JWT['AUTH_REFRESH_COOKIE'])
        if refresh_token:
            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)

            if response.status_code == 200:
                access_token = response.data.get('access')
                response.set_cookie(
                    key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                    value=access_token,
                    expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )
            return response


class InnEaseTokenVerifyView(TokenVerifyView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        if access_token:
            request.data['token'] = access_token

        return super().post(request, *args, **kwargs)


class InnEaseLogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_REFRESH_COOKIE'])

        return response


class UserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [CurrentUserOrAdmin]

    def get_object(self):
        return self.request.user


class UserHotelDetailView(RetrieveUpdateDestroyAPIView):
    lookup_field = "id"
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsCEOorITStaff]


class UserHotelListView(ListCreateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsCEOorITStaff]
    serializer_class = UserHotelSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(hotel=self.request.user.hotel)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context


class SetPasswordView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [CurrentUserOrAdmin]

    def get_object(self):
        return self.request.user

    def create(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = SetPasswordSerializer(data=request.data)
        if serializer.initial_data.get("new_password") == serializer.initial_data.get("re_new_password"):
            if instance.check_password(serializer.initial_data.get("current_password")):
                instance.set_password(
                    serializer.initial_data.get("new_password"))
                instance.save()
                return Response({"message": "Password Changed Successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Incorrect Password"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "Password do not match"}, status=status.HTTP_400_BAD_REQUEST)


class ResetPassword(CreateAPIView):
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.get(email=serializer.data.get('email'))
            if user is not None and user.is_active:
                activation_token = signer.sign_object(
                    {"email": serializer.data.get("email")})
                send_password_reset_email(
                    serializer.data.get("email"), activation_token)
                return Response({"message": "Password Reset Mail Sent"}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordConfirm(CreateAPIView):
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = ResetPasswordConfirmSerializer(data=request.data)
        if serializer.is_valid():
            try:
                token = serializer.data.get("token")
                data = signer.unsign_object(
                    token, max_age=timedelta(minutes=10))
            except:
                return Response({"message": "Reset Password Link has expired."}, status=status.HTTP_400_BAD_REQUEST)
            if serializer.data.get("new_password") == serializer.data.get("re_new_password"):
                user = User.objects.get(email=data['email'])
                user.set_password(serializer.data.get("new_password"))
                user.save()
                return Response({"message": "Password Changed Successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
