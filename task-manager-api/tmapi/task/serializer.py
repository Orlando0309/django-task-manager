from rest_framework import serializers
from .models import State, Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'dueDate', 'taskState', 'user']
        read_only_fields = ['user']

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['id','abbr','label','level']
