from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from api.models import UserExtension, Competition
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User, Group
import datetime
from datetime import timedelta
from django.http import HttpResponse

# Create your views here.
def index(request):
  any_comps = False
  user = request.user
  comps = list(Competition.objects.filter(date=datetime.date.today()))
  if comps:
    set_dt = f"{comps[0].date} {comps[0].time_end}"
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    str1 = datetime.datetime.fromisoformat(set_dt)
    str2 = datetime.datetime.fromisoformat(current_time)
    if str2 < str1:
      any_comps = True
  if user.is_authenticated:
    user_extension = UserExtension.objects.get(username=request.user.username)
    return render(request, "frontend/index.html", {"usern": user_extension, "comps": any_comps})
  else:
    return redirect("login")

@login_required
def question(request, declension):
  user = request.user
  extension = UserExtension.objects.get(username=user.username)
  return render(request, "frontend/question.html", {"user": user, "declension": declension, "usere": extension})

def logout_request(request):
  logout(request)
  return redirect("index")
  
@login_required
def stats(request):
  user = request.user
  extension = UserExtension.objects.get(username=user.username)
  return render(request, "frontend/stats.html", {"usern": extension})

@login_required
def leaderboard(request):
  user = UserExtension.objects.get(username=request.user.username)
  return render(request, "frontend/leader.html", {"usern": user})

@login_required
def teacher(request):
  user = UserExtension.objects.get(username=request.user.username)
  if user.is_teacher:
    return render(request, "frontend/teacher.html")
  else:
    return redirect("index")

@login_required
def class_view(request, name):
  user = UserExtension.objects.get(username=request.user.username)
  if user.is_teacher:
    return render(request, "frontend/class.html", {"class_name":name})
  else:
    return redirect("index")
    
@login_required
def shop(request):
  user = UserExtension.objects.get(username=request.user.username)
  return render(request, "frontend/shop.html", {"user": user, "usern": user})

def register(request):
  if request.method == "POST":
    form = UserCreationForm(request.POST)
    if form.is_valid():
      form.save()
      username = form.cleaned_data["username"]
      password = form.cleaned_data["password1"]
      user = authenticate(username=username, password=password)
      user_extension = UserExtension(username=username)
      user_extension.save()
      login(request, user)
      return redirect("index")
  else:
    form = UserCreationForm()
  context = {"form": form}
  return render(request, "registration/registration.html", context)

def certamen(request):
  exists = list(Competition.objects.filter(date=datetime.date.today()))
  if len(exists) > 0:
    set_dt = f"{exists[0].date} {exists[0].time_end}"
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    str1 = datetime.datetime.fromisoformat(set_dt)
    str2 = datetime.datetime.fromisoformat(current_time)
    if len(exists) > 0:
      if str2 < str1:
        adjusted_start = str2 - timedelta(hours=4)
        adjusted_end = str1 - timedelta(hours=4)
        js_start = adjusted_start.isoformat()
        js_end = adjusted_end.isoformat()
        return render(request, "frontend/competition.html", {"start": adjusted_start, "end": adjusted_end, "js_start":js_start, "js_end":js_end})
  return HttpResponse("Page not currently available")

