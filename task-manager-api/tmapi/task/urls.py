from django.urls import include, path
from rest_framework import routers
from .views import TagAPIView, TaskAPIView

task_routers= routers.DefaultRouter()

task_routers.register(r'task', TaskAPIView)
task_routers.register(r'taskstate', TagAPIView)

urlpatterns=[
    path('', include(task_routers.urls))
]