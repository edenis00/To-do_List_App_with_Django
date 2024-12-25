from django.urls import path
from . import views


urlpatterns = [
    path('tasks/', views.TaskListView.as_view(), name="task-list"),
    path('tasks/create', views.TaskCreateView.as_view(), name='task-create')
]
