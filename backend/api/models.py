from django.db import models

class User(models.Model):
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
    like_count = models.IntegerField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_by = models.ForeignKey(
        'User',
        on_delete=models.DO_NOTHING
    )
    last_updated = models.DateTimeField(auto_now=True, null=True, blank=True)
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
        'User',
        on_delete=models.DO_NOTHING
    )


class KnowledgeBaseItem(models.Model):
    tool_id = models.ForeignKey(
        'Tool',
        on_delete=models.DO_NOTHING
    )
    content_type = models.CharField(max_length=30, null=True, blank=True)
    title = models.CharField(max_length=256, null=True, blank=True)
    content = models.CharField(max_length=10000, null=True, blank=True)

class Tool(models.Model):
    name = models.CharField(max_length=256, null=True, blank=True)
    category = models.CharField(max_length=150, null=True, blank=True)

class KnowledgeBaseTag(models.Model):
    tag = models.CharField(max_length=50, null=True, blank=True)
    blog_post_id = models.ForeignKey(
        'KnowledgeBaseItem',
        on_delete=models.DO_NOTHING
    )