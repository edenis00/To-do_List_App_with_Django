from .models import Task
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

# Create your views here.

class TaskListView(ListView):
    model = Task
    template_name = 'tasks/home.html'
    context_object_name = 'tasks'
    
    
class TaskCreateView(CreateView):
    model = Task
    template_name = 'tasks/task_form.html'
    fields = ['title', 'description', 'completed', 'due_date']
    success_url = reverse_lazy('task-list')
    
    
class TaskUpdateView(UpdateView):
    model = Task
    template_name =  'tasks/task_form.html'
    fields = ['title', 'description', 'completed', 'due_date']
    success_url = reverse_lazy('task-list')
    
    
class TaskDeleteView(DeleteView):
    model = Task
    template_name = 'tasks/task_confirm_delete.html'
    success_url = reverse_lazy('task-list')