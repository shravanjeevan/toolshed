from django.urls import include, path, re_path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),

    # common
    path('posts/', views.BlogsList.as_view()),
    path('tags/popular/', views.PopularBlogTags.as_view()),

    # posts
    # GET /posts/popular?top=10
    path('posts/popular/', views.PopularBlogList.as_view()),
    path('posts/<int:pk>', views.Blogs.as_view()),

    # knowledge base
    # GET /knowledge/popular?top=10
    path('knowledge/popular/', views.PopularKnowledgeList.as_view()),
    path('knowledge/<int:pk>', views.KnowledgeBaseList.as_view()),

    # tools
    path('tools/', views.Tools.as_view()),

    # tool categories
    path('categories/', views.AllCategories.as_view()),
    path('categories/popular', views.ExploreCategories.as_view()),
    path('categories/<str:category>', views.FilterCategories.as_view()),

    # search
    re_path(r'search/$', views.Search.as_view()),

    #  auth and admin
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/auth/', include('knox.urls')),

    path("auth/register/", views.RegistrationAPI.as_view()),
    path("auth/login/", views.LoginAPI.as_view()),
    path("auth/user/", views.UserAPI.as_view()),

    path("like/<int:pk>", views.LikeCounter.as_view())
]
