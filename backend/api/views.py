from django.shortcuts import render

from rest_framework import viewsets

from .serializers import BlogSerializer
from .models import BlogPost

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('title')
    serializer_class = BlogSerializer


class PopularBlogPosts(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-like_count')[:6]
    serializer_class = BlogSerializer
