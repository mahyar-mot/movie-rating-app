from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import Movie, Rating


class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'password')
        write_only_fields = ('password', )

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        token = Token.objects.create(user=user)
        return user


class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('id', 'title', 'description', 'no_of_rating', 'avg_rating')


class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = '__all__'


class MovieRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = ('stars',)

    def create(self, validated_data):
        movie = validated_data.pop('movie')
        user = validated_data.pop('user')
        rating, created = Rating.objects.update_or_create(
            user=user,
            movie=movie,
            defaults={'stars': validated_data.get('stars')}
        )
        return rating
