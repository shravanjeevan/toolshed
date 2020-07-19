from django.contrib import admin
from .models import *

admin.site.register(BlogPost)
admin.site.register(User)
admin.site.register(UserGroup)
admin.site.register(BlogPostVisibility)
admin.site.register(BlogPostTag)
