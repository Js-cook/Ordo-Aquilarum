from django.urls import path
from . import views
urlpatterns = [
    path("", views.index, name="index"),
    path("practice/<str:declension>/", views.question, name="question"),
    path("logout", views.logout_request, name="log_out"),
    path("stats", views.stats, name="stats"),
    path("leaderboard", views.leaderboard, name="leaderboard"),
    path("teacher-portal", views.teacher, name="teacher-portal"),
    path("classes/<str:name>/", views.class_view, name="class-view"),
    path("shop", views.shop, name="shop"),
    path("register", views.register, name="register"),
    # Delete this after 
    path("certamen", views.certamen, name="certamen"),
    path("certamen/rumble/", views.test, name="test")
]