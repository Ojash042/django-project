from django.urls import path
from .views import *


urlpatterns = [
    path('filmlists/', FilmsListApi.as_view(), name="film_lists"),
    path('film/<str:imdb_id>', FilmDetails.as_view(), name="film_details"),
    path('screening/<int:screening_id>', SeatDetails.as_view(), name='screening_details'),
    path('reserve-seats', InsertSeats.as_view(), name='seat_reservation')
]
