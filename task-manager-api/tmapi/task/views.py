from rest_framework import viewsets,permissions

from task.models import State, Task
from task.serializer import TaskSerializer,StateSerializer
import django_filters.rest_framework
from rest_framework.response import Response

import django_filters
from .models import Task

class TaskFilter(django_filters.FilterSet):
    class Meta:
        model = Task
        fields = ['taskState']  # or other fields you want to filter by

class TaskAPIView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset= Task.objects.all().order_by('-createdAt')
    serializer_class = TaskSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = TaskFilter
    
    def perform_create(self, serializer):
        # maka ny an'ilay user amin'ny alalan'ny connexion-ny
        serializer.save(user=self.request.user)
    
    def list(self, request, *args, **kwargs):
        # Filter the queryset to only include tasks belonging to the authenticated user
        queryset = self.filter_queryset(self.get_queryset().filter(user=request.user))
        
        # Optional: Add additional filtering logic if needed (like pagination)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

# raha ohatra ka mila etat flexible akotrana pending,done, ongoing
class TagAPIView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = State.objects.all()
    serializer_class = StateSerializer
    