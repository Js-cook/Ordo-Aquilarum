from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from api.models import UserExtension
# Create your views here.
def index(request):
  user = request.user
  if user.is_authenticated:
    user_extension = UserExtension.objects.get(username=request.user.username)
    return render(request, "frontend/index.html", {"usern": user_extension})
  else:
    return redirect("login")

@login_required
def question(request, declension):
  user = request.user
  return render(request, "frontend/question.html", {"user": user, "declension": declension})

def logout_request(request):
  logout(request)
  return redirect("index")