from rest_framework import serializers
from cinemahall.models import Film
from cinemahall.services.services import tmdb_data


class FilmsSerializer(serializers.ModelSerializer):
    poster = serializers.CharField(max_length=200)
    overview = serializers.CharField(max_length=200)
    backdrop =serializers.CharField(max_length=200)
    class Meta:
        model = Film
        fields = "__all__"
