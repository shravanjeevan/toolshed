import datetime

from django.db import connection
from elasticsearch import Elasticsearch
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, permissions, generics

from knox.models import AuthToken

from .models import BlogPost as BlogPostModel
from .models import BlogPostTag
from .models import UserInfo
from .models import Tool
from .serializers import BlogSerializer, CreateUserSerializer, UserSerializer, LoginUserSerializer

es = Elasticsearch(["http://elastic:9200"])


def article_index_payload_builder(blogpost_db_id, blogpost_data, author_first_name, created_date):
    data = {
        "id": blogpost_db_id,
        "title": blogpost_data["title"],
        "content": blogpost_data["content"],
        "type": "blog",
        "author": author_first_name,
        "createdDate": created_date,
        "tags": blogpost_data["tags"],
        "likeCount": 0
    }
    return data


class Blogs(APIView):
    def get(self, request, pk):
        blogs = BlogPostModel.objects.get(id=pk)

        values = blogs.__dict__
        values["tags"] = []
        values["createdByDisplayName"] = blogs.createdBy.first_name + ' ' + blogs.createdBy.last_name
        values["type"] = "blog_post"

        for tag in blogs.tags.all():
            values["tags"].append(tag.tag)

        del values['_state']

        return Response(status=200, data=values)


    """
    {
        "title": "Pavan first blogpost",
        "content": "Content for the blogpost blah blah blah blach",
        "authorId": "1",
        "tags": ["happiness", "joy"]
    }
    """


    def blogmodelToDict(blogs):
        values = list(blogs.values())

        for idx, blog in enumerate(blogs):
            values[idx]["tags"] = []
            values[idx]["createdByDisplayName"] = blog.createdBy.first_name + ' ' + blog.createdBy.last_name
            values[idx]["type"] = "blog_post"
            print(blog.tags.all())
            for tagId in blog.tags.all():
                values[idx]["tags"].append(tagId.tag)

        return values


class BlogsList(APIView):
    def get(self, request):
        blogs = BlogPostModel.objects.all()

        values = list(blogs.values())

        for idx, blog in enumerate(blogs):
            values[idx]["tags"] = []
            values[idx]["createdByDisplayName"] = blog.createdBy.first_name + ' ' + blog.createdBy.last_name
            values[idx]["type"] = "blog_post"

            for tagId in blog.tags.all():
                values[idx]["tags"].append(tagId.tag)

        return Response(status=200, data=values)

    def post(self, request):
        blog_data = request.data

        print(blog_data)
        if does_blog_post_exist(blog_data["authorId"], blog_data["title"]):

            data = {'message': "You already have a blogpost with the same title. Please choose another title."}
            return Response(data=data, status=403)
        else:
            user = UserInfo.objects.get(id=blog_data["authorId"])

            blogpost_db = BlogPostModel(title=blog_data["title"],
                                        content=blog_data["content"],
                                        createdBy=user,
                                        likeCount=0,
                                        visibility="visible")

            blogpost_db.save()

            # Save tags

            add_tags(blogpost_db, blog_data["tags"])

            # Index in elasticsearch
            blogpost_es = article_index_payload_builder(blogpost_db.id, blog_data, user.first_name,
                                                        str(datetime.datetime))
            es.index(index='knowledge_base', body=blogpost_es)

        return Response(status=200, data={"message": "Successfully add a new blog post"})


    def add_tags(blogpostModel, tags):
        for i in tags:
            tag = BlogPostTag(tag=i)
            tag.save()
            blogpostModel.tags.add(tag)


class PopularBlogList(APIView):
    def get(self, request):
        blogs = BlogPostModel.objects.all().order_by('-likeCount')[:3]
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
            data = dictfetchall(cursor)

        return Response(data, status=200)


class ExploreCategories(APIView):
    def get(self, request):
        with connection.cursor() as cursor:
            cursor.execute('SELECT category, '
                           'COUNT(1) as "publishedCount" '
                           'from API_TOOL GROUP BY '
                           'CATEGORY ORDER BY "publishedCount" DESC '
                           'LIMIT 6')
            data = dictfetchall(cursor)

        return Response(data, status=200)


class PopularBlogTags(APIView):
    def get(self, request):
        with connection.cursor() as cursor:
            cursor.execute('select tag, count(1) "tagCount" from '
                           '(select ab.tag as tag from  '
                           'api_blogpost_tags abt join api_blogposttag ab '
                           'on ab.id = abt.blogposttag_id) t '
                           'group by tag '
                           'order by "tagCount" desc limit 10')
            data = dictfetchall(cursor)

        return Response(data, status=200)


def does_blog_post_exist(author, title):
    with connection.cursor() as cursor:
        cursor.execute("SELECT COUNT(*) FROM api_blogpost WHERE api_blogpost.\"createdBy_id\" = %s AND title = %s",
                       [author, title])
        data = dictfetchall(cursor)
        print(data)
        if int(data[0]["count"]) > 0:
            return True
        else:
            return False


class Search(APIView):
    def get(self, request):
        query = request.GET.get('query')

        if not query:
            return Response(status=400, data={"message": "No search query provided"})

        resp = es.search(body=
        {
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": ["content", "title", "tags", "createdByDisplayName", "visibility"],
                    # "auto_generate_synonyms_phrase_query": True
                }
            }
        })

        if len(resp["hits"]["hits"]) <= 0:
            return Response(status=404, data={})

        blog_result_id = []

        for res in resp["hits"]["hits"]:
            id = res["_source"]["id"]
            blog_result_id.append(id)

        blog_results = BlogPostModel.objects.filter(id__in=blog_result_id)
        blog_results = blogmodelToDict(blog_results)

        return Response(data=blog_results, status=200)


class FilterCategories(APIView):
    def get(self, request, category):
        tools = Tool.objects.filter(category__iexact=category)
        values = []
        for idx, t in enumerate(tools):
            value = {"name": t.name, "category": t.category}
            values.append(value)
        return Response(status=200, data=values)


class Tools(APIView):
    def get(self, request):
        tools = Tool.objects.all()

        values = []
        for idx, t in enumerate(tools):
            value = {"id": t.id, "name": t.name, "category": t.category}
            values.append(value)
        return Response(status=200, data=values)


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class loginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })