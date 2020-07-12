from django.db import models

# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    display_name = models.CharField(max_length=256)
    email_address = models.EmailField(max_length=256)
    password = models.CharField(max_length=256)
    user_group_id = models.ForeignKey(
        'UserGroup',
        on_delete=models.DO_NOTHING
    )

class UserGroup(models.Model):
    user_group_name = models.CharField(max_length=30)

class BlogPost(models.Model):
    title = models.CharField(max_length=256)
    content = models.CharField(max_length=10000)
    like_count = models.IntegerField()
    created_on = models.DateTimeField()
    created_by = models.ForeignKey(
        'User',
        on_delete=models.DO_NOTHING
    )
    last_updated = models.DateTimeField()
    visibility_id = models.ForeignKey(
        'BlogPostVisibility',
        on_delete=models.DO_NOTHING
    )

class BlogPostVisibility(models.Model):
    visibility_name = models.CharField(max_length=30)

