from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('blogs/', views.BlogsList.as_view()),
    path('blogs/popular/', views.PopularBlogList.as_view()),
    path('categories/', views.AllCategories.as_view()),
    path('categories/explore', views.ExploreCategories.as_view()),
    path('tags/popular/', views.PopularBlogTags.as_view()),
    path('blog/<int:pk>', views.BlogsList.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]