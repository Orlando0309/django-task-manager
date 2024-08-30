from django.core.mail import send_mail
from task.models import Task
from tmapi import settings


def my_cron_job():
    tasks_by_user = Task.get_tomorrow_tasks_by_user()
    for username, tasks in tasks_by_user.items():
        print(f"Tasks for {username}:")
        message=f"Dear {username}, \n Task Manager just want to remind you that you still have these tasks for tomorrow: \n"
        for task in tasks:
            message+=f"- {task.title}\n"
            print(f"  - {task.title}")
        send_mail("Reminder",message,settings.EMAIL_HOST_USER,[username,])