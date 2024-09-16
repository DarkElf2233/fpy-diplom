from django.db import models
import datetime


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


def user_path(instance):
    return instance.user.username


class Files(models.Model):
    title = models.CharField(max_length=100)
    comment = models.CharField(max_length=250, default='')
    size = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    last_download = models.DateField(default=datetime.date.today())
    user = models.ForeignKey(Users, default=1, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=user_path, default='')

    class Meta:
        ordering = ['created']
        verbose_name = 'File'
        verbose_name_plural = 'Files'
