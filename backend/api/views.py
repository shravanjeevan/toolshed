import datetime

from django.contrib.auth.models import User
from django.db import connection
from elasticsearch import Elasticsearch
from knox.models import AuthToken
from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import BlogPost as BlogPostModel
from .models import BlogPostTag
from .models import KnowledgeBaseItem
from .models import KnowledgeBaseTag
from .models import Tool
from .models import BlogPostComment
from django.contrib.auth.models import User
from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer, CommentSerializer

es = Elasticsearch(["http://elastic:9200"])


def article_index_payload_builder(blogpost_db_id, blogpost_data, author_first_name, created_date, type):
    data = {
        "id": blogpost_db_id,
        "title": blogpost_data["title"],
        "content": blogpost_data["content"],
        "type": type,
        "author": author_first_name,
        "createdDate": created_date,
        "tags": blogpost_data["tags"],
        "likeCount": 0
    }
    return data


class Blogs(APIView):
    def get(self, request, pk):
        try:
            blogs = BlogPostModel.objects.get(id=pk)
        except:
            return Response(status=404, data={"message": "Could't find your post."})

        values = blogs.__dict__
        values["tags"] = []
        values["createdByDisplayName"] = blogs.createdBy.first_name + ' ' + blogs.createdBy.last_name
        values["type"] = "blog_post"
        values["createdById"] = blogs.createdBy.id
        del values["createdBy_id"]

        for tag in blogs.tags.all():
            values["tags"].append(tag.tag)

        del values['_state']

        return Response(status=200, data=values)

    def delete(self, request, pk):
        try:
            blog = BlogPostModel.objects.get(id=pk)
        except:
            return Response(status=404, data={"message": "The post you're trying to delete "
                                                         "may have already been deleted. "
                                                         "Can't find it here."})
        blog.delete()

        es.delete_by_query(index='knowledge_base', body=
        {
            "query": {
                "match": {
                    "id": pk,
                }
            }
        })
        return Response(status=200, data={"message": "Post deleted"})


def blogmodelToDict(blogs):
    values = list(blogs.values())

    for idx, blog in enumerate(blogs):
        values[idx]["tags"] = []
        values[idx]["createdByDisplayName"] = blog.createdBy.first_name + ' ' + blog.createdBy.last_name
        values[idx]["type"] = "blog_post"
        for tagId in blog.tags.all():
            values[idx]["tags"].append(tagId.tag)

    return values


def kbmodelToDict(kb_items):
    values = list(kb_items.values())

    for idx, blog in enumerate(kb_items):
        values[idx]["tags"] = []
        values[idx]["type"] = "knowledge_base"
        for tagId in blog.tags.all():
            values[idx]["tags"].append(tagId.tag)

    return values


"""
 Blogpost Item
 {
     "title": "Pavan first blogpost",
     "content": "Content for the blogpost blah blah blah blach",
     "authorId": "1",
     "tags": ["happiness", "joy"],
     "type": "blog_post"
 }

 Knowledge Base
  {
     "title": "Pavan first knowledge base item",
     "content": "Content for the blogpost blah blah blah blach",
     "authorId": "2",
     "tags": ["happiness", "first", "knowledge"],
     "type": "knowledge_base",
     "toolId": "7"
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
            values[idx]["createdById"] = blog.createdBy.id
            del values[idx]["createdBy_id"]

            for tagId in blog.tags.all():
                values[idx]["tags"].append(tagId.tag)

        return Response(status=200, data=values)

    def post(self, request):
        request_data = request.data

        print(request_data)

        if "type" in request_data and request_data["type"] == 'knowledge_base':
            if KnowledgeBaseItem.objects.filter(title__iexact=request_data["title"]):
                return Response(status=200, data={
                    "message": "You already have a knowledge base item with the same title. Please choose another title."})

            user = User.objects.get(id=request_data["authorId"])

            # if not user.is_staff:
            #     return Response(status=403, data={'message':'You are not authorized to create a knowledge base item'})

            if "likeCount" in request_data:
                likeCount = request_data["likeCount"]
            else:
                likeCount = 0

            tool = Tool.objects.get(id=request_data["toolId"])
            knowledge_base_item = KnowledgeBaseItem(title=request_data["title"],
                                                    content=request_data["content"],
                                                    tool_id=tool,
                                                    likeCount=likeCount)
            knowledge_base_item.save()
            add_tags_knowledge_base(knowledge_base_item, request_data["tags"])

            knowledge_base_es = article_index_payload_builder(knowledge_base_item.id, request_data, user.first_name,
                                                              str(datetime.datetime), "knowledge_base")

            es.index(index='knowledge_base', body=knowledge_base_es)
            return Response(status=200, data={"message": "Successfully add a new knowledge base item",
                                            "id": knowledge_base_item.id,
                                            "type": "knowledge_base"})

        if does_blog_post_exist(request_data["authorId"], request_data["title"]):

            data = {'message': "You already have a blogpost with the same title. Please choose another title."}
            return Response(data=data, status=403)
        else:
            user = User.objects.get(id=request_data["authorId"])

            blogpost_db = BlogPostModel(title=request_data["title"],
                                        content=request_data["content"],
                                        createdBy=user,
                                        likeCount=0,
                                        visibility="visible")

            blogpost_db.save()

            # Save tags
            add_tags_blogpost(blogpost_db, request_data["tags"])

            # Index in elasticsearch
            blogpost_es = article_index_payload_builder(blogpost_db.id, request_data, user.first_name,
                                                        str(datetime.datetime), "blog_post")
            es.index(index='knowledge_base', body=blogpost_es)
        return Response(status=200, data={"message": "Successfully add a new blog post",
                                          "id": blogpost_db.id,
                                          "type": "blog_post"})


def add_tags_knowledge_base(knowledge_base_model, tags):
    for i in tags:
        tag = KnowledgeBaseTag(tag=i)
        tag.save()
        knowledge_base_model.tags.add(tag)


def add_tags_blogpost(blogpostModel, tags):
    for i in tags:
        tag = BlogPostTag(tag=i)
        tag.save()
        blogpostModel.tags.add(tag)


class PopularBlogList(APIView):
    def get(self, request):
        top = request.GET.get('top')
        if not top:
            top = 10

        blogs = BlogPostModel.objects.all().order_by('-likeCount')[:int(top)]

        values = list(blogs.values())

        for idx, blog in enumerate(blogs):
            values[idx]["tags"] = []
            values[idx]["createdByDisplayName"] = blog.createdBy.first_name + ' ' + blog.createdBy.last_name
            values[idx]["type"] = "blog_post"
            values[idx]["createdById"] = blog.createdBy.id
            del values[idx]["createdBy_id"]

            for tagId in blog.tags.all():
                values[idx]["tags"].append(tagId.tag)
        return Response(status=200, data=values)


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
        kb_result_id = []

        for res in resp["hits"]["hits"]:
            print(res["_source"]["type"])
            if "blog" in res["_source"]["type"]:
                id = res["_source"]["id"]
                blog_result_id.append(id)
            else:
                id = res["_source"]["id"]
                kb_result_id.append(id)

        print(blog_result_id)

        blog_results = BlogPostModel.objects.filter(id__in=blog_result_id)
        kb_results = KnowledgeBaseItem.objects.filter(id__in=kb_result_id)

        blog_results = blogmodelToDict(blog_results)
        kb_results = kbmodelToDict(kb_results)

        blog_results.append(kb_results)

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


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class CommentListAPI(APIView):
    def get(self, request, pk):
        '''GET method of comments (returns all comments for given BlogPost ID)'''

        # Grab list of comments for this BlogPost
        try:
            comments = BlogPostComment.objects.all().filter(blog_post_id__exact=pk)
            values = list(comments.values())
        except:
           return Response(status=404, data={"message": "Error: BlogPost not found."})

        # Double check that blogpost was found
        if len(values) == 0:
            return Response(status=404, data={"message": "Error: BlogPost not found."})

        for idx, comment in enumerate(comments):
            # Build response object
            values[idx]["id"] = comment.id
            values[idx]["author"] = comment.created_by.first_name + ' ' + comment.created_by.last_name
            values[idx]["createdOn"] = comment.created_on
            values[idx]["body"] = comment.content
            
            # Delete un-needed values
            del values[idx]["created_by_id"]
            del values[idx]["blog_post_id_id"]
            del values[idx]["content"]
            del values[idx]["created_on"]

        return Response(status=200, data=values)

class CommentAPI(APIView):
    def post(self, request):
        '''POST method for BlogPost comments'''

        comment_data = request.data
        
        # Get user instance
        try:
            user = User.objects.get(id=comment_data["authorId"])
        except:
           return Response(status=400, data={"message": "Author not found."}) 

        # Get blogpost instance
        try:
            blog_post = BlogPostModel.objects.get(id=comment_data["postId"])
        except:
            return Response(status=400, data={"message": "The blog post was not found."})

        # Finally, create the actual comment
        comment_db_item = BlogPostComment(content=comment_data["body"],
                                        blog_post_id=blog_post,
                                        created_by=user
                                        )        
        comment_db_item.save()

        return Response(status=200, data={"message": "Successfully created a comment"})

    def delete(self, request, pk):
        '''DELETE method for comment'''

        try:
            comment = BlogPostComment.objects.get(id=pk)
        except:
            return Response(status=404, data={"message": "The comment you're trying to delete "
                                                         "may have already been deleted. "
                                                         "It cannot be found."})
        # Perform delete
        comment.delete()

        return Response(status=200, data={"message": "Comment deleted."})

class PopularKnowledgeList(APIView):
    def get(self, request):
        top = request.GET.get('top')
        if not top:
            top = 10

        kb_items = KnowledgeBaseItem.objects.all().order_by('-likeCount')[:int(top)]
        values = list(kb_items.values())

        for idx, item in enumerate(kb_items):
            values[idx]["tags"] = []
            values[idx]["type"] = "knowledge_base"
            tool = Tool.objects.filter(id=values[idx]["tool_id_id"])[0]
            tool_name = tool.name
            tool_category = tool.category

            values[idx]["toolName"] = tool_name
            values[idx]["toolId"] = values[idx]["tool_id_id"]
            values[idx]["toolCategory"] = tool_category

            del values[idx]["content_type"]
            del values[idx]["tool_id_id"]

            for tagId in item.tags.all():
                values[idx]["tags"].append(tagId.tag)

        return Response(status=200, data=values)


class KnowledgeBaseList(APIView):
    def get(self, request, pk):
        try:
            kb_items = KnowledgeBaseItem.objects.get(id=pk)
        except:
            return Response(status=404, data={"message": "Could't find your post."})

        values = kb_items.__dict__
        values["tags"] = []
        values["type"] = "knowledge_base"
        tool = Tool.objects.get(id=values["tool_id_id"])
        values["toolCategory"] = tool.category
        values["toolName"] = tool.name
        values["toolId"] = values["tool_id_id"]
        del values["tool_id_id"]
        del values["content_type"]

        for tag in kb_items.tags.all():
            values["tags"].append(tag.tag)

        del values['_state']

        return Response(status=200, data=values)


class LikeCounter(APIView):
    def get(self, request, pk):
        try:
            blog = BlogPostModel.objects.get(id=pk)
        except:
            return Response(status=404, data={"message": "Could't find your post."})

        return Response(status=200, data={"id": blog.id, "title": blog.title, "likeCount": blog.likeCount})

    def post(self, request, pk):
        try:
            blog = BlogPostModel.objects.get(id=pk)
            blog.likeCount += 1
            blog.save()
        except:
            return Response(status=404, data={"message": "Could't find your post."})

        return Response(status=200, data={"id": blog.id, "title": blog.title, "likeCount": blog.likeCount})

class UserDetails(APIView):
    def get(self, request, pk):
        '''GET method for retrieving user data'''

        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM auth_user WHERE id = %s", [pk])
                data = dictfetchall(cursor)[0]
        except:
            return Response(status=404, data={"message": "User not found!"})

        display_name = data["first_name"] + " " + data["last_name"]
        return Response(status=200, data={"id": data["id"], 
                                         "display_name": display_name,
                                         "email": data["email"],
                                        "username": data["username"]})

class UserBlogs(APIView):
    def get(self, request, pk):
        blogs = BlogPostModel.objects.filter(id=pk)

        values = list(blogs.values())

        for idx, blog in enumerate(blogs):
            values[idx]["tags"] = []
            values[idx]["createdByDisplayName"] = blog.createdBy.first_name + ' ' + blog.createdBy.last_name
            values[idx]["type"] = "blog_post"
            values[idx]["createdById"] = blog.createdBy.id
            del values[idx]["createdBy_id"]

            for tagId in blog.tags.all():
                values[idx]["tags"].append(tagId.tag)

        return Response(status=200, data=values)

