from django.contrib import admin
from .models import Question, UserExtension
# Register your models here.
admin.site.register(Question)
admin.site.register(UserExtension)