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

    # posts
    # GET /posts/popular?top=10
    path('posts/popular/', views.PopularBlogList.as_view()),
    path('posts/<int:pk>', views.Blogs.as_view()),


    # knowledge base
    # GET /knowledge/popular?top=10
    path('knowledge/popular/', views.PopularKnowledgeList.as_view()),
    # todo: (not yet implemented)
    # path('posts/knowledge/<int:pk>', views.Blogs.as_view()),
    # path('posts/knowledge/popular/', views.PopularBlogList.as_view()),

    path('categories/', views.AllCategories.as_view()),
    path('categories/popular', views.ExploreCategories.as_view()),
    path('categories/<str:category>', views.FilterCategories.as_view()),

    path('tools/', views.Tools.as_view()),

    path('tags/popular/', views.PopularBlogTags.as_view()),

    re_path(r'search/$', views.Search.as_view()),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('api/auth/', include('knox.urls')),

    path("auth/register/", views.RegistrationAPI.as_view()),
    path("auth/login/", views.LoginAPI.as_view()),
    path("auth/user/", views.UserAPI.as_view())
]
