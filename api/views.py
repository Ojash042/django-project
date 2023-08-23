from django.contrib.auth import user_logged_in
from django.db.models import Prefetch
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from cinemahall.models import Film, Screening, Theatre, Seat, SeatReserved
from . import serializer
from rest_framework.permissions import AllowAny
from cinemahall.services.services import tmdb_data
from .serializer import FilmDetailsSerializer, ScreeningSerializer, SeatSerializer


class FilmsListApi(ListCreateAPIView):
    queryset = Film.objects.all()
    serializer_class = serializer.FilmsListSerializer
    permission_classes = (AllowAny,)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        print(request)
        for obj in queryset:
            movie_data = tmdb_data(obj.film_imdb_id)
            poster_path = movie_data['poster_path']
            backdrop_path = movie_data['backdrop_path']

            obj.poster = f'https://image.tmdb.org/t/p/original{poster_path}'
            obj.overview = movie_data["overview"]
            obj.backdrop = f'https://image.tmdb.org/t/p/original{backdrop_path}'

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class FilmDetails(APIView):
    permission_classes = (AllowAny,)

    @staticmethod
    def get(request, imdb_id):
        film_object = Film.objects.prefetch_related(Prefetch("screening_set", queryset=Screening.objects.prefetch_related(
            Prefetch("Theatre")))).get(film_imdb_id=imdb_id)
        movie_data = tmdb_data(film_object.film_imdb_id)

        poster_path = movie_data['poster_path']
        backdrop_path = movie_data['backdrop_path']

        film_object.poster = f"https://image.tmdb.org/t/p/original/{poster_path}"
        film_object.overview = movie_data["overview"]
        film_object.backdrop = f'https://https:image.tmdb.org/t/p/original{backdrop_path}'

        serializers = FilmDetailsSerializer(film_object)
        return Response(serializers.data)


class SeatDetails(APIView):
    permission_classes = (AllowAny,)
    # serializer_class = serializer.SeatSerializer

    @staticmethod
    def get(request, screening_id):
        # screenings = Screening.objects.select_related('Theatre').prefetch_related('Theatre__seat_set').get(pk=screening_id)
        screening = Screening.objects.select_related('Theatre').prefetch_related("Theatre__seat_set__seatreserved").get(pk=screening_id)
        seats = screening.Theatre.seat_set.all()
        for seat in seats:
            try:
                x = seat.seatreserved.Seat
                seat.hasSeatReserved = True
            except:
                if not hasattr(seat, "hasSeatReserved"):
                    seat.hasSeatReserved = False

        serializer = SeatSerializer(seats, many=True)

        return Response(serializer.data)


class InsertSeats(APIView):
    def post(self, request):
        print(self.request.user)
        return Response(str(request.user))

    @staticmethod
    def get(request):
        print(request.user)
        return Response(str(request.user))
