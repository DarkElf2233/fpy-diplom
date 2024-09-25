from django.db import models
from uuid import uuid4
import os
from django.utils.timezone import now


class Users(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=100)
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=10, default='USER')

    class Meta:
        ordering = ['full_name']
        verbose_name = 'User'
        verbose_name_plural = 'Users'


def user_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid4().hex[:8]}.{ext}'
    return os.path.join('storage_files', instance.user.username, filename)


class Files(models.Model):
    title = models.CharField(max_length=100)
    comment = models.CharField(max_length=250, default='')
    size = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    last_download = models.DateField(default=now)
    user = models.ForeignKey(Users, default=1, on_delete=models.CASCADE)
    image = models.FileField(upload_to=user_path, default='')

    class Meta:
        ordering = ['created']
        verbose_name = 'File'
        verbose_name_plural = 'Files'
