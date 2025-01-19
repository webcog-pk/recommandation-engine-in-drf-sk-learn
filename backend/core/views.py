from django.shortcuts import render
from .models import Movies
from .serializers import MovieSerializers
from rest_framework.views import APIView
from rest_framework.response import Response
from .similar_movies import get_similar_movies


class MoviesListApi(APIView):
    def get(self, request):
        movies = Movies.objects.all()
        serializer = MovieSerializers(movies, many=True)

        return Response({
            'movies':serializer.data,
        })

class MoviesDetailApi(APIView):
    def get(self, request, id):
        movies = Movies.objects.get(id=id)
        serializer = MovieSerializers(movies)
        similar_movies = get_similar_movies(id,5)
        similar_movies_serializer = MovieSerializers(similar_movies, many=True)


        return Response({
            'movies':serializer.data,
            'similar_movies':similar_movies_serializer.data,

        })

# Create your views here.
