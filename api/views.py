from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Question, UserExtension

from .serializers import UserExtensionSerializer, QuestionSerializer

import random

# Create your views here.
@api_view(["GET"])
def api_overview(request):
  api_urls = {
    'Retrieve User Stats': '/retrieve-stats/<str:username>/',
    'Retrieve All Stats': '/retrieve-all-stats/',
    'Add Correct': '/add-correct/<str:username>/',
    'Add Incorrect': '/add-incorrect/<str:username>/',
    'Change Points': '/change-points/<str:username>/',
    'Retrieve Question': '/retrieve-question/<str:declension>/',
    'Retrieve Incorrect': '/retrieve-others/'
  }
  return Response(api_urls)

@api_view(["GET"])
def ind_stats(request, username):
  extension = UserExtension.objects.get(username=username)
  serializer = UserExtensionSerializer(extension, many=False)
  return Response(serializer.data)

@api_view(["GET"])
def all_stats(request):
  all_extensions = UserExtension.objects.all()
  serializer = UserExtensionSerializer(all_extensions, many=True)
  return Response(serializer.data)
  
@api_view(["GET"])
def add_correct(request, username):
  user = UserExtension.objects.get(username=username)
  user.correct += 1
  user.save()
  serializer = UserExtensionSerializer(user, many=False)
  return Response(serializer.data)

@api_view(["GET"])
def add_incorrect(request, username):
  user = UserExtension.objects.get(username=username)
  user.incorrect += 1
  user.save()
  serializer = UserExtensionSerializer(user, many=False)
  return Response(serializer.data)

@api_view(["POST"])
def change_points(request, username, amount):
  pass

@api_view(["GET"])
def retrieve(request, declension):
  possibilities = []
  duplicates = []
  for question in Question.objects.all():
    if declension in question.declension:
      possibilities.append(question)
  selected_question = random.choice(possibilities)
  duplicates.append(selected_question)
  for question in Question.objects.all():
    if question == selected_question:
      continue
    elif question.term in selected_question.term:
      duplicates.append(question)
  serializer = QuestionSerializer(duplicates, many=True)
  return Response(serializer.data)

@api_view(["GET"])
def retrieve_others(request):
  pass