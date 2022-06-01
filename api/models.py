from django.db import models

# Create your models here.
class Question(models.Model):
  term = models.CharField(max_length=30)
  case = models.CharField(max_length=20)
  number = models.CharField(max_length=5)
  gender = models.CharField(max_length=5)
  declension = models.CharField(max_length=15)

  def __str__(self):
    return(self.term)