from django import forms
from .models import Task


class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ["title", "description", "due_date", "completed"]
        widgets = {
            "title": forms.TextInput(
                attrs={
                    "class": "w-full border outline-none py-1 px-2 rounded",
                }
            ),
            "description": forms.Textarea(
                attrs={
                    "rows": 4,
                    "class": "w-full border outline-none py-1 px-2 rounded",
                }
            ),
            "due_date": forms.DateInput(
                attrs={
                    "class": "w-full border outline-none py-1 px-2 rounded",
                    "placeholder": "mm-dd-yyyy",
                }
            ),
        }
