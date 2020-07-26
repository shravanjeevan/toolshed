from django.db import connection
from rest_framework.response import Response
from rest_framework.views import APIView
import datetime
import pytz
import requests
import logging


# import requests

from .models import BlogPost
from .models import User
from .serializers import BlogSerializer



def elastic_index_builder(request):
    data = """"{
        "title": "Adding a password to your Zoom room",
        "content": "....",
        "type": "req",
        "created_by": "request.data.",
        "tags": [
            "video",
            "communication"
        ],
        "like_count": "50"
    }"""

#     {
#     "title": "Cloud Security 17",
#     "content": "cloud sec best practice",
#     "created_by": 1
# }

class BlogsList(APIView):
    def get(self, request):
        blogs = BlogPost.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

    def post(self, request):
        # data = json.loads(request.data)
        data = request.data

        print("title: " + str(request.data["title"]))
        tz_au = pytz.timezone('Australia/Sydney')
        timenow = datetime.datetime.now(tz_au)

        elastic_data = {}
        elastic_data["title"] = data["title"]
        elastic_data["content"] = data["content"]

        user = User.objects.get(id=data["created_by"])
        elastic_data["created_by"] = data["created_by"]
        elastic_data["display_name"] =  user.display_name
        elastic_data["first_name"] =  user.first_name
        elastic_data["last_name"] =  user.last_name

        # create a blogpost object and save it to the db
        new_blog = BlogPost(
            title=data["title"],
            content=data["content"],
            like_count=0,
            created_on=timenow,
            created_by = User.objects.get(id=data["created_by"])
        )
        new_blog.save()

        # save it to elastic search
        res = requests.post("http://localhost:9200", elastic_data)
        if res.status_code == 200:
            logging.log('ERROR', "There was a problem indexing the blogpost to elasticsearch"
                                 "Payload: {}", res.json())

        return Response(status=200)



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

