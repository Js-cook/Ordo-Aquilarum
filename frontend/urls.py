from django.urls import path
from . import views
urlpatterns = [
    path("", views.index, name="index"),
    path("practice/<str:declension>/", views.question, name="question")
]