from django.db import models
from django.contrib.auth.models import User

class UserInfo(models.Model):
    first_name = models.CharField(max_length=256, null=True, blank=True)
    last_name = models.CharField(max_length=256, null=True, blank=True)
    display_name = models.CharField(max_length=256, null=True, blank=True)
    email_address = models.EmailField(max_length=256, null=True, blank=True)
    password = models.CharField(max_length=256, null=True, blank=True)
    user_group = models.CharField(max_length=30, null=True, blank=True)

class BlogPostTag(models.Model):
    tag = models.CharField(max_length=50, null=True, blank=True)

class BlogPost(models.Model):
    title = models.CharField(max_length=256, null=True, blank=True)
    content = models.CharField(max_length=10000, null=True, blank=True)
    likeCount = models.IntegerField(null=True, blank=True)
    createdOn = models.DateTimeField(auto_now=True, null=True, blank=True)
    createdBy = models.ForeignKey(
        User, related_name="posts",
        on_delete=models.DO_NOTHING
    )
    lastUpdated = models.DateTimeField(auto_now=True, null=True, blank=True)
    visibility = models.CharField(max_length=30, null=True, blank=True)
    tags = models.ManyToManyField(BlogPostTag, related_name='blogpost_tag')

class BlogPostComment(models.Model):
    blog_post_id = models.ForeignKey(
        'BlogPost',
        on_delete=models.DO_NOTHING
    )
    content = models.CharField(max_length=5000, null=True, blank=True)
    created_on = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(
        User, related_name="comments",
        on_delete=models.DO_NOTHING
    )

class Tool(models.Model):
    name = models.CharField(max_length=256, null=True, blank=True)
    category = models.CharField(max_length=150, null=True, blank=True)

class KnowledgeBaseTag(models.Model):
    tag = models.CharField(max_length=50, null=True, blank=True)

class KnowledgeBaseItem(models.Model):
    tool_id = models.ForeignKey(
        'Tool',
        on_delete=models.DO_NOTHING
    )
    content_type = models.CharField(max_length=30, null=True, blank=True)
    title = models.CharField(max_length=256, null=True, blank=True)
    content = models.CharField(max_length=10000, null=True, blank=True)
    tags = models.ManyToManyField(KnowledgeBaseTag, related_name='knowledge_base_tag')
    # this is a hacky way to do likes, we'll calculate it dynamically moving forward.
    likeCount = models.IntegerField(null=True, blank=True)

