import uuid
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin


class Hotel(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to="hotel_logos/", null=True, blank=True)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('user_type', 'admin')
        user = self.create_user(
            email,
            password=password,
            name=name,
            **extra_fields
        )
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):

    ROLE_CHOICES = [
        ('ceo', 'CEO'),
        ('receptionist', 'Receptionist'),
        ('manager', 'Manager'),
        ('it', 'IT')
    ]

    USER_TYPE_CHOICES = [
        ('admin', 'Admin'),
        ('hotel_staff', 'Hotel Staff'),
    ]
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    user_type = models.CharField(
        choices=USER_TYPE_CHOICES, default='hotel_staff', max_length=20)
    role = models.CharField(choices=ROLE_CHOICES,
                            blank=True, null=True, max_length=20)
    hotel = models.ForeignKey(
        Hotel, on_delete=models.CASCADE, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email
