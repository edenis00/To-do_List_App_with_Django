from django.db import models

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    due_date = models.DateField(blank=True, null=True)
    
    class Meta:
        ordering = ["-created_at"]
    
    def __str__(self):
        return f"Title: {self.title}"


