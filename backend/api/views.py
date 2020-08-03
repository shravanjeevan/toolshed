from django.db import connection
from elasticsearch import Elasticsearch
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import BlogPost as BlogPostModel
from .models import User
from .serializers import BlogSerializer

es = Elasticsearch(["http://localhost:9200"])
# es = Elasticsearch(["http://elastic:9200"])


def article_index_payload_builder(title, content, type, author, tags, likes, created_date):
    data = {
        'title': title,
        'content': content,
        'type': type,
        'author': author,
        'created_date': created_date,
        'tags': tags,
        'like_count': likes
    }
    return data


# the method called when creating a brand new blogpost
class BlogPost(APIView):
    def post(self, request):
        if does_blog_post_exist(request.user, request.title):
            data = {'message': "You already have a blogpost with the same title. Please choose another title."}
            return Response(data=data, status=403)
        else:
            #   create a blogbost entry in the db
            #   create a blogpost entry in elasticsearch
            user_id = request.user_id
            user = User.objects.get(id=user_id)

            blogpost_db = BlogPostModel(title=request.title,
                                    content=request.content,
                                    type='blog',
                                    author=user,
                                    tags=request.tags,
                                    likes=0)
            blogpost_db.save()
            blogpost_es = article_index_payload_builder(request.blogpost_data)
            es.index(index='knowledge_base',body=blogpost_es)





class BlogsList(APIView):
    def get(self, request):
        blogs = BlogPostModel.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

    def post(self, request):

        if does_blog_post_exist(request.user, request.title):
            data = {'message': "You already have a blogpost with the same title. Please choose another title."}
            return Response(data=data, status=403)
        else:
            #   create a blogbost entry in the db
            #   create a blogpost entry in elasticsearch
            user_id = request.user_id
            user = User.objects.get(id=user_id)

            blogpost_db = BlogPostModel(title=request.title,
                                        content=request.content,
                                        type='blog',
                                        author=user,
                                        tags=request.tags,
                                        likes=0)
            blogpost_db.save()
            blogpost_es = article_index_payload_builder(request.blogpost_data)
            es.index(index='knowledge_base',body=blogpost_es)

        return Response(status=200)


class PopularBlogList(APIView):
    def get(self, request):
        blogs = BlogPostModel.objects.all().order_by('-like_count')[:3]
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

# GET: categories/explore
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


class PopularBlogTags(APIView):
    def get(self, request):
        with connection.cursor() as cursor:
            cursor.execute('select tag, count(1) tagcount from '
                           '(select ab.tag as tag from  '
                           'api_blogpost_tags abt join api_blogposttag ab '
                           'on ab.id = abt.blogposttag_id) t '
                           'group by tag '
                           'order by tagCount desc limit 10')
            data = dictfetchall(cursor)

        return Response(data, status=200)


def does_blog_post_exist(author, title):
    with connection.cursor() as cursor:
        cursor.execute("SELECT COUNT(*) FROM api_blogpost WHERE created_by = %s AND title = %s", [author, title])
        data = dictfetchall(cursor)
        if data.count() > 0:
            return True
        else:
            return False
