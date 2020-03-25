from django.contrib.auth import get_user_model

from rest_framework import viewsets, decorators, response, status, authentication, permissions

from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer, MovieRatingSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):

    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class MovieViewSet(viewsets.ModelViewSet):

    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated, )

    def get_serializer_class(self):
        if self.action == 'rate_movie':
            return MovieRatingSerializer
        return super().get_serializer_class()

    @decorators.action(detail=True, methods=['POST'])
    def rate_movie(self, request, pk=None):
        movie = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(movie=movie, user=request.user)
            return response.Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        return response.Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class RatingViewSet(viewsets.ModelViewSet):

    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated, )
