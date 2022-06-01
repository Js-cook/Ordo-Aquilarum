from django.urls import path
from . import views
urlpatterns = [
    path("", views.api_overview, name="overview"),
    path("retrieve-stats", views.stats, name="stats"),
    path("add-correct", views.add_correct, name="add-correct"),
    path("add-incorrect", views.add_incorrect, name="add-incorrect"),
    path("change-points", views.change_points, name="change-points"),
    path("retrieve-question", views.retrieve, name="retrieve"),
    path("retrieve-others", views.retrieve_others, name="retrieve-others")
]