from django.db import connection
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import BlogPost
from .serializers import BlogSerializer


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


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
        ]

class AllCategories(APIView):
    def get(self, request):
        with connection.cursor() as cursor:
            cursor.execute('SELECT distinct category from API_TOOL')
            data = cursor.fetchall()

        response_json = []
        for i in data:
            category_name = i[0]
            response_json.append(category_name)

        return Response(response_json, status=200)


class ExploreCategories(APIView):

    def get(self, request):
        with connection.cursor() as cursor:
            cursor.execute('SELECT category, '
                            'COUNT(1) as publishedCount '
                            'from API_TOOL GROUP BY '
                            'CATEGORY ORDER BY publishedCount DESC '
                            'LIMIT 6')
            data = dictfetchall(cursor)

        return Response(data, status=200)


