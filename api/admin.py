from django.contrib import admin
from .models import Question, UserExtension, Session, Competition, Rumble
# Register your models here.
admin.site.register(Question)
admin.site.register(UserExtension)
admin.site.register(Session)
admin.site.register(Competition)
admin.site.register(Rumble)