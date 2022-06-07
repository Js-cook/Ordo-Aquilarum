from django.urls import path
from . import views
urlpatterns = [
    path("", views.index, name="index"),
    path("practice/<str:declension>/", views.question, name="question"),
    path("logout", views.logout_request, name="log_out"),
    path("stats", views.stats, name="stats"),
    path("leaderboard", views.leaderboard, name="leaderboard")
]