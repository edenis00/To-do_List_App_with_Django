from .models import Task
from django.http import JsonResponse
from .forms import TaskForm
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

# Create your views here.


class TaskListView(ListView):
    model = Task
    template_name = "tasks/home.html"

    def get_queryset(self):
        tasks = self.request.GET.get("type", "completed")

        if tasks == "completed":
            return Task.objects.filter(completed=True)
        return Task.objects.filter(completed=False)

    def render_to_response(self, context, **response_kwargs):
        if self.request.headers.get("x-requested-with") == "XMLHttpRequest":
            tasks = list(
                self.get_queryset().values(
                    "id", "title", "description", "created_at", 
                    "due_date", "completed"
                )
            )
            for task in tasks:
                task["created_at"] = task["created_at"].strftime(
                    "%b %d, %Y %I:%M %p"
                )
                if task["due_date"] is None:
                    task["due_date"] = "No Due Date"

            return JsonResponse({"tasks": tasks})
        return super().render_to_response(context, **response_kwargs)


class TaskCreateView(CreateView):
    model = Task
    template_name = "tasks/task_form.html"
    form_class = TaskForm
    success_url = reverse_lazy("task-list")


class TaskUpdateView(UpdateView):
    model = Task
    template_name = "tasks/task_form.html"
    form_class = TaskForm
    success_url = reverse_lazy("task-list")


class TaskDeleteView(DeleteView):
    model = Task
    template_name = "tasks/task_confirm_delete.html"
    success_url = reverse_lazy("task-list")
