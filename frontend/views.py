from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.
def index(request):
  return render(request, "frontend/index.html")

@login_required
def question(request, declension):
  user = request.user
  return render(request, "frontend/question.html", {"user": user, "declension": declension})