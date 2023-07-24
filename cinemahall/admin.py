from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Film)
admin.site.register(Customer)
admin.site.register(Screening)
admin.site.register(Theatre)
admin.site.register(Seat)
admin.site.register(SeatReserved)
admin.site.register(Reservation)
admin.site.register(ReservationType)
