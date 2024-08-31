from atexit import register
from django.contrib import admin

from storage.models import Users, Files

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'full_name', 'role', 'path_to_user']

@admin.register(Files)
class FilesAdmin(admin.ModelAdmin):
    list_display = ['title', 'path_to_file']
