from rest_framework import serializers
from cinemahall.models import Film, Screening, Theatre, Seat


class FilmsListSerializer(serializers.ModelSerializer):
    poster = serializers.CharField(max_length=200)
    overview = serializers.CharField(max_length=200)
    backdrop = serializers.CharField(max_length=200)

    class Meta:
        model = Film
        fields = "__all__"


class TheatreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theatre
        fields = ["theatre_name"]


class ScreeningSerializer(serializers.ModelSerializer):
    theatre = serializers.SlugRelatedField(source="Theatre", many=False, slug_field="theatre_name", queryset=Theatre.objects.all())

    class Meta:
        model = Screening
        fields = ["screening_start_date", "screening_start_time", "theatre", "id"]


class FilmDetailsSerializer(serializers.ModelSerializer):
    poster = serializers.CharField(max_length=200)
    overview = serializers.CharField(max_length=200)
    backdrop = serializers.CharField(max_length=200)

    screening = ScreeningSerializer(source="screening_set", many=True, read_only=True)

    class Meta:
        model = Film
        fields = ["poster", "overview", "backdrop", "film_name", "film_director", "film_released_date", "film_released_state", "film_imdb_id", "film_cast", "screening"]


class SeatSerializer(serializers.ModelSerializer):
    hasSeatReserved = serializers.BooleanField()

    class Meta:
        model = Seat
        fields = ["id", "seat_row", "seat_column", "hasSeatReserved"]
