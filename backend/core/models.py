from django.db import models

# Create your models here.

class Movies(models.Model):
    title = models.CharField(max_length=255)
    original_title = models.CharField(max_length=255)
    overview = models.TextField()
    release_date = models.DateField()
    budget = models.BigIntegerField(null=True, blank=True)
    revenue = models.BigIntegerField(null=True, blank=True)
    runtime = models.IntegerField(null=True, blank=True)
    genres = models.JSONField()  # Assuming you want to store genres as JSON
    poster_path = models.CharField(max_length=255)
    popularity = models.FloatField()
    vote_average = models.FloatField()
    vote_count = models.IntegerField()
    homepage = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.title
