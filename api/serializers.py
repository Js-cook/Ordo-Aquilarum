from rest_framework import serializers
from .models import UserExtension, Question

class UserExtensionSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserExtension
    fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Question
    fields = "__all__"