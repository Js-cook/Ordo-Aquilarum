from rest_framework import serializers
from .models import UserExtension, Question, Session, Competition, Rumble
from django.contrib.auth.models import Group

class UserExtensionSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserExtension
    fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Question
    fields = "__all__"

class GroupSerializer(serializers.ModelSerializer):
  class Meta:
    model = Group
    fields = "__all__"

class SessionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Session
    fields = "__all__"

class CompetitionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Competition
    fields = "__all__"

class RumbleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Rumble
    fields = "__all__"