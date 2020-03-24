from django.db import models
from django.contrib.auth import get_user_model


class Movie(models.Model):

    title = models.CharField(max_length=32)
    description = models.TextField(max_length=360)

    def __str__(self):
        return self.title

    def no_of_rating(self):
        return Rating.objects.filter(movie=self).count()

    def avg_rating(self):
        avg_rating = Rating.objects.filter(movie=self).aggregate(avg=models.Avg('stars'))
        return avg_rating['avg']


class Rating(models.Model):

    STAR_CHOICES = (
        (1, 'very bad'),
        (2, 'bad'),
        (3, 'meh'),
        (4, 'good'),
        (5, 'very good'),
    )
    movie = models.ForeignKey('Movie', on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    stars = models.SmallIntegerField(choices=STAR_CHOICES)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=('movie', 'user'), name='unique_user_score'),
        ]
        indexes = [
            models.Index(fields=('movie', 'user'), name='index_user_movie'),
        ]
