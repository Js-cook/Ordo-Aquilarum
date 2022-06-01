import csv
from api.models import Question

def create():
  with open("final.csv", "r") as file:
    csv_reader = csv.reader(file, delimiter=",")
    for row in csv_reader:
      question = Question(term=row[0], case=row[1], number=row[2], gender=row[3], declension=row[4])
      question.save()