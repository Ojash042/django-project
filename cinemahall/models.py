from django.contrib.auth.hashers import make_password
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from humanize import naturalday
from Cinema_Hall_Ticket import settings
from .managers import CustomUserManager


class Film(models.Model):
    film_name: str = models.CharField(max_length=50)
    film_director = models.CharField(max_length=50)
    film_released_state = models.BooleanField()
    film_released_date = models.DateField()
    film_imdb_id = models.CharField(max_length=30)
    film_cast = models.CharField(max_length=200)

    def __str__(self):
        return self.film_name


class Customer(AbstractBaseUser, PermissionsMixin):
    customer_email = models.EmailField(_("email address"), unique=True)
    customer_contact_info = models.CharField(max_length=15)
    customer_first_name = models.CharField(max_length=200)
    customer_last_name = models.CharField(max_length=200)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "customer_email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return f'{self.customer_first_name} {self.customer_last_name}'


class Theatre(models.Model):
    theatre_name = models.CharField(max_length=30)
    theatre_no_of_seats = models.IntegerField()

    def __str__(self):
        return f'{self.theatre_name}'


class Screening(models.Model):
    Film = models.ForeignKey(Film, on_delete=models.CASCADE)
    Theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    screening_start_date = models.DateField()
    screening_start_time = models.TimeField()

    def __str__(self):
        return f'Film: {self.Film.film_name} Theatre: {self.Theatre.theatre_name} Starts: {self.screening_start_time.isoformat(timespec="minutes")} Date:{naturalday(self.screening_start_date)}'


class Seat(models.Model):
    Theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    seat_row = models.CharField(max_length=2)
    seat_column = models.IntegerField()

    def __str__(self):
        return f'Seat {self.seat_row} {self.seat_column} @ {self.Theatre.theatre_name}'


class ReservationType(models.Model):
    reservation_type = models.CharField(max_length=200)


class Reservation(models.Model):
    Screening = models.ForeignKey(Screening, on_delete=models.CASCADE)
    Customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ReservationType = models.ForeignKey(ReservationType, on_delete=models.CASCADE)
    reservation_reserved = models.BooleanField
    reservation_paid = models.BooleanField
    reservation_active = models.BooleanField


class SeatReserved(models.Model):
    Seat = models.OneToOneField(Seat, on_delete=models.CASCADE)
    Reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    Screening = models.ForeignKey(Screening, on_delete=models.CASCADE)
