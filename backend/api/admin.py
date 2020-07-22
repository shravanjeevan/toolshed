from django.contrib import admin
from .models import *

admin.site.register(BlogPost)
admin.site.register(User)
admin.site.register(BlogPostTag)
admin.site.register(BlogPostComment)
admin.site.register(KnowledgeBaseItem)
admin.site.register(KnowledgeBaseTag)
admin.site.register(Tool)