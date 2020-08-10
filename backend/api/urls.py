from django.urls import include, path, re_path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),

    # posts
    path('posts/', views.BlogsList.as_view()),
    path('posts/popular/', views.PopularBlogList.as_view()),
    path('posts/<int:pk>', views.Blogs.as_view()),

    path('categories/', views.AllCategories.as_view()),
    path('categories/popular', views.ExploreCategories.as_view()),
    path('categories/<str:category>', views.FilterCategories.as_view()),

    path('tools/', views.Tools.as_view()),

    path('tags/popular/', views.PopularBlogTags.as_view()),

    re_path(r'search/$', views.Search.as_view()),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
