from rest_framework.generics import ListCreateAPIView, GenericAPIView
from rest_framework.response import Response
from cinemahall.models import Film
from . import serializer
from rest_framework.permissions import AllowAny
from cinemahall.services.services import tmdb_data


class FilmsListApi(ListCreateAPIView):
    queryset = Film.objects.all()
    serializer_class = serializer.FilmsSerializer
    permission_classes = (AllowAny,)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        for obj in queryset:
            movie_data = tmdb_data(obj.film_imdb_id)
            poster_path = movie_data['poster_path']
            backdrop_path = movie_data['backdrop_path']

            obj.poster = f'https://image.tmdb.org/t/p/original{poster_path}'
            obj.overview = movie_data["overview"]
            obj.backdrop = f'https://image.tmdb.org/t/p/original{backdrop_path}'

        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)


class FilmDetails(GenericAPIView):
    pass