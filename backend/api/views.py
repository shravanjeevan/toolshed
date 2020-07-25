from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response


from .serializers import BlogSerializer
from .models import BlogPost

class BlogsList(APIView):
    def get(self, request):
        blogs = BlogPost.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

class PopularBlogList(APIView):
    def get(self, request):
        blogs = BlogPost.objects.all().order_by('-like_count')[:3]
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

