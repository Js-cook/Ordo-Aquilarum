from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Question, UserExtension, Session
from django.contrib.auth.models import Group, User

from .serializers import UserExtensionSerializer, QuestionSerializer, GroupSerializer, SessionSerializer
from .adj_gen import generate_adj

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
    'Retrieve Incorrect': '/retrieve-others/',
    'Add Group': '/create-group/<str:name>/',
    'Add User to Group': '/add-group/<str:gname>/<str:username>/',
    'Retrieve All Classes': '/retrieve-all-groups/',
    'Retrieve Students': '/retrieve-students/<str:name>/',
    'New Session': '/add-session/',
    'Retrieve Sessions': '/sessions/<str:username>/',
    'Add Insurance': '/add-insurance/<str:username>/<int:amount>/',
    'Add Multiplier': '/add-multiplier/<str:username>/<int:amount>/',
    'Change Role': '/change-role/<str:username>/<str:role>/'
  }
  return Response(api_urls)

@api_view(["GET"])
def ind_stats(request, username):
  extension = UserExtension.objects.get(username=username)
  serializer = UserExtensionSerializer(extension, many=False)
  return Response(serializer.data)

@api_view(["GET"])
def all_stats(request):
  # all_extensions = UserExtension.objects.all()
  all_extensions = UserExtension.objects.order_by("-correct")
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

@api_view(["GET"])
def change_points(request, username, amount):
  user = UserExtension.objects.get(username=username)
  user.points += amount
  user.save()
  return Response("Point values updated")

@api_view(["GET"])
def retrieve(request, declension):
  possibilities = []
  duplicates = []
  for question in Question.objects.all():
    if declension == "all":
      possibilities.append(question)
    elif declension in question.declension:
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
def retrieve_others(request, declension):
  func = generate_adj(declension)
  serializer = QuestionSerializer(func, many=True)
  return Response(serializer.data)

@api_view(["GET"])
def new_group(request, name):
  try:
    existing = Group.objects.get(name=name)
    return Response(f"{name} already exists")
  except:
    new_group = Group(name=name)
    new_group.save()
    return Response("Group created successfully")
    
# When you go to list ppl in group you need to find their user extension from the username in the group
@api_view(["GET"])
def add_to_group(request, username, gname):
  group = Group.objects.get(name=gname)
  user = User.objects.get(username=username)
  user.groups.add(group)
  return Response(f"{user.username} added to group")

@api_view(["GET"])
def all_groups(request):
  groups = Group.objects.all()
  serializer = GroupSerializer(groups, many=True)
  return Response(serializer.data)

@api_view(["GET"])
def retrieve_students(request, name):
  students = []
  for user in User.objects.all():
    if user.groups.filter(name=name).exists():
      extension = UserExtension.objects.get(username=user.username)
      students.append(extension)
  serializer = UserExtensionSerializer(students, many=True)
  return Response(serializer.data)

@api_view(["POST"])
def create_session(request):
  serializer = SessionSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

@api_view(["GET"])
def retrieve_sessions(request, username):
  user_sessions = []
  all_sessions = Session.objects.all()
  for session in all_sessions:
    if username in session.username:
      user_sessions.append(session)
  serializer = SessionSerializer(user_sessions, many=True)
  return Response(serializer.data)

@api_view(["GET"])
def add_multiplier(request, username, amount):
  extension = UserExtension.objects.get(username=username)
  extension.points_multiplier = amount
  extension.save()
  return Response(f"Multiplier updated to {amount}x")

@api_view(["GET"])
def add_insurance(request, username, amount):
  extension = UserExtension.objects.get(username=username)
  extension.points_insurance = amount
  extension.save()
  return Response(f"Insurance now reduces losses by {amount}x")

@api_view(["GET"])
def change_role(request, username, role):
  extension = UserExtension.objects.get(username=username)
  extension.role = role
  extension.save()
  return Response(f"Role updated to {role}")