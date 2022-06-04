from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
# Create your views here.
def index(request):
  return render(request, "frontend/index.html")

@login_required
def question(request, declension):
  user = request.user
  return render(request, "frontend/question.html", {"user": user, "declension": declension})

def logout_request(request):
  logout(request)
  return redirect("index")