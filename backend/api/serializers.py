from rest_framework import serializers

from .models import BlogPost

class BlogSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    content = serializers.CharField(required=False, allow_blank=True, max_length=3000)

    class Meta:
        model = BlogPost
        fields = ('id','title', 'content', 'likeCount', 'createdBy', 'createdOn', 'tags')


