from django.urls import path
from . import views
urlpatterns = [
    path("", views.api_overview, name="overview"),
    path("retrieve-stats/<str:username>/", views.ind_stats, name="stats"),
    path("retrieve-all-stats/", views.all_stats, name="all-stats"),
    path("add-correct/<str:username>/", views.add_correct, name="add-correct"),
    path("add-incorrect/<str:username>/", views.add_incorrect, name="add-incorrect"),
    path("change-points/<str:username>/", views.change_points, name="change-points"),
    path("retrieve-question/<str:declension>/", views.retrieve, name="retrieve"),
    path("retrieve-others/", views.retrieve_others, name="retrieve-others")
]