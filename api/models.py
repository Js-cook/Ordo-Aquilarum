from django.db import models

# Create your models here.
class Question(models.Model):
  term = models.CharField(max_length=30)
  case = models.CharField(max_length=20)
  number = models.CharField(max_length=5)
  gender = models.CharField(max_length=5)
  declension = models.CharField(max_length=15)
  times_incorrect = models.IntegerField(default=0)

  class Meta:
    indexes = [models.Index(fields=["declension"])]

  def __str__(self):
    return(self.term)

class UserExtension(models.Model):
  username = models.CharField(max_length=100)
  is_teacher = models.BooleanField(default=False)
  correct = models.IntegerField(default=0)
  incorrect = models.IntegerField(default=0)
  points = models.IntegerField(default=0)
  role = models.CharField(max_length=100, default="None")
  points_multiplier = models.IntegerField(default=1)
  points_insurance = models.IntegerField(default=1)

  comp_points = models.IntegerField(default=0)
  comp_multiplier = models.IntegerField(default=1)
  comp_insurance = models.IntegerField(default=1)

  def __str__(self):
    return(self.username)

class Session(models.Model):
  username = models.CharField(max_length=100)
  date = models.DateField(auto_now=True)
  time_start = models.TimeField()
  time_end = models.TimeField()
  correct = models.IntegerField(default=0)
  incorrect = models.IntegerField(default=0)
  average = models.FloatField(default=0)

  def __str__(self):
    return(f"{self.username} - {self.date}")

# If this model exists for a certain date, open the view function in frontend
class Competition(models.Model):
  date = models.DateField(auto_now=True)
  time_start = models.TimeField()
  time_end = models.TimeField()

  def __str__(self):
    return(f"{self.date}")