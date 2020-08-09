from django.db import connection
from elasticsearch import Elasticsearch
from rest_framework.response import Response
from rest_framework.views import APIView
import datetime

from .models import BlogPost as BlogPostModel
from .models import BlogPostTag
from .models import UserInfo
from .serializers import BlogSerializer


es = Elasticsearch(["http://elastic:9200"])


def article_index_payload_builder(blogpost_data, author_first_name, created_date):
    data = {
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
            blogpost_es = article_index_payload_builder(blog_data, user.first_name, str(datetime.datetime))
            es.index(index='knowledge_base',body=blogpost_es)

        return Response(status=200)

def add_tags(blogpostModel, tags):
    existing_tags = BlogPostTag.objects.all()
    for i in tags:
        if existing_tags.filter(tag=i).exists():
            continue
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
        cursor.execute("SELECT COUNT(*) FROM api_blogpost WHERE api_blogpost.\"createdBy_id\" = %s AND title = %s", [author, title])
        data = dictfetchall(cursor)
        print(data)
        if int(data[0]["count"]) > 0:
            return True
        else:
            return False

def create_blog_post_tag(tags):
    existing_tags = BlogPostTag.objects.all()
    for i in tags:
        if existing_tags.filter(tag=i).exists():
            continue
        tag = BlogPostTag(tag=i)
        tag.save()

#  todo: search not working yet
class Search(APIView):
    def get(self, request):
        query = request.GET.get('query')
        print(query)
        resp = es.search(body={"query": {"match": {"content": {"query": query}}}})
        print(resp)

        # {
        #     "query": {
        #         "match": {
        #             "message": {
        #                 "query": "this is a test"
        #             }
        #         }
        #     }
        # }
        return Response(data=request.GET.get('query'), status=200)
