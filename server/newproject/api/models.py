from django.db import models

# Create your models here.
class Kids(models.Model):
    name = models.CharField(max_length=100)
    age_kid = models.IntegerField()
    email_kid = models.EmailField()

    def __str__(self):
        return self.name
