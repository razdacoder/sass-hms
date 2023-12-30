from rest_framework import serializers
from .models import User, Hotel


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class UserHotelSerializer(serializers.ModelSerializer):
    hotel = HotelSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'role',
                  'password', 'hotel']
        extra_kwargs = {'password': {'write_only': True},
                        'id': {'read_only': True}, }

    def create(self, validated_data):
        context = self.context
        hotel = context['user'].hotel
        return User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            hotel=hotel,
            password=validated_data['password'],
            role=validated_data['role']
        )


class UserSerializer(serializers.ModelSerializer):
    re_password = serializers.CharField(write_only=True)
    hotel = HotelSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'role',
                  'password', 're_password', 'hotel']
        extra_kwargs = {'password': {'write_only': True},
                        'id': {'read_only': True}, }


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name',
                  'last_name', 'avatar']
        extra_kwargs = {
            'id': {'read_only': True}, 'email': {'read_only': True}}


class ActivationSerializer:
    activation_code = serializers.CharField(max_length=6)
    activation_token = serializers.CharField()


class SetPasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(style={"input_type": "password"})
    new_password = serializers.CharField(style={"input_type": "password"})
    re_new_password = serializers.CharField(style={"input_type": "password"})


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ResetPasswordConfirmSerializer(serializers.Serializer):
    token = serializers.CharField()
    new_password = serializers.CharField(style={"input_type": "password"})
    re_new_password = serializers.CharField(style={"input_type": "password"})


class UserDeleteSerializer(serializers.Serializer):
    current_password = serializers.CharField(style={"input_type": "password"})
