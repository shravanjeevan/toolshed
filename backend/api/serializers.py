from rest_framework import serializers

from .models import BlogPost

class BlogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BlogPost
        fields = ('title', 'content')


