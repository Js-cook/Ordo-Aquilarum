from django.urls import path
from . import views
urlpatterns = [
    path("overview", views.api_overview, name="overview")
]