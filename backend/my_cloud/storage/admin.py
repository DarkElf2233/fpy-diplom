from django.contrib import admin
from django.contrib.auth.models import Group

from storage.models import Users, Files

admin.site.unregister(Group)

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'created', 'is_staff']
    exclude = ['password', 'is_superuser', 'groups', 'last_login', 'user_permissions', 'date_joined']

@admin.register(Files)
class FilesAdmin(admin.ModelAdmin):
    list_display = ['title', 'comment', 'size', 'created', 'user']
