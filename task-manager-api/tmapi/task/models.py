from datetime import datetime, timedelta, timezone
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    dueDate = models.DateTimeField(null=True, blank=True)
    createdAt=models.DateTimeField(default=timezone.now)
    taskState = models.CharField(max_length=20,default='PENDING')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')

    def __str__(self):
        return self.title
    
    @staticmethod
    def get_tomorrow_tasks_by_user():
        # Define the start and end of tomorrow
        today = timezone.now().date()
        start_of_tomorrow = timezone.make_aware(datetime.combine(today + timedelta(days=1), datetime.min.time()))
        end_of_tomorrow = timezone.make_aware(datetime.combine(today + timedelta(days=2), datetime.min.time()))

        # Query tasks with dueDate falling in tomorrow's range and group by user
        tasks_by_user = Task.objects.filter(dueDate__range=[start_of_tomorrow, end_of_tomorrow]) \
            .values('user__username') \
            .annotate(tasks=models.Count('id')) \
            .order_by('user__username')

        # Build a dictionary with users as keys and lists of tasks as values
        grouped_tasks = {}
        for item in tasks_by_user:
            username = item['user__username']
            tasks = Task.objects.filter(dueDate__range=[start_of_tomorrow, end_of_tomorrow], user__username=username)
            grouped_tasks[username] = list(tasks)

        return grouped_tasks
    
class State(models.Model):
    abbr = models.CharField(max_length=10)
    level=models.IntegerField(default=0)
    label = models.CharField(max_length=50)
    
    class Meta:
        db_table = 'state'  # New table name

