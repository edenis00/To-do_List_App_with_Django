Django To-Do List App

Description
A simple To-Do List app built with Django, using Class-Based Views (CBVs). Users can create, update, and delete tasks, as well as mark them as completed.

Features
CRUD operations for To-Do tasks
Class-Based Views for handling views and forms

Tech Stack
Backend: Django
Database: SQLite (or PostgreSQL if you're using that)
Authentication: Django’s built-in authentication system

Installation

Clone the repository:
git clone https://github.com/edenis00/To-do_List_App_with_Django
Navigate into the project folder:

cd todolist-app
Install the dependencies:
pip install -r requirements.txt

Run migrations to set up the database:
python manage.py migrate

Create a superuser (to access the Django admin):
python manage.py createsuperuser

Run the server:
python manage.py runserver
Visit http://127.0.0.1:8000/ in your browser.

Usage
Create a new task via the "Add Task" page.
View, edit, or delete tasks from the main to-do list page.
Mark tasks as completed.
