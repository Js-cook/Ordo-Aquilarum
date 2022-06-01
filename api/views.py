from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
@api_view(["GET"])
def api_overview(request):
  api_urls = {
    'Retrieve Stats': '/retrieve-stats',
    'Add Correct': '/add-correct',
    'Add Incorrect': '/add-incorrect',
    'Change Points': '/change-points',
    'Retrieve Question': '/retrieve-question',
    'Retrieve Incorrect': '/retrieve-others'
  }
  return Response(api_urls)

# path("retrieve-stats", views.stats, name="stats"),
#     path("add-correct", views.add_correct, name="add-correct"),
#     path("add-incorrect", views.add_incorrect, name="add-incorrect"),
#     path("change-points", views.change_points, name="change-points"),
#     path("retrieve-question", views.retrieve, name="retrieve"),
#     path("retrieve-others", views.retrieve_others, name="retrieve-others")