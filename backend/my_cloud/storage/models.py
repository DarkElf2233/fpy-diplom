from django.db import models
from django.contrib.auth.models import AbstractUser

from uuid import uuid4
import os


class Users(AbstractUser):
    username = models.CharField(verbose_name='Логин', max_length=50, unique=True)
    first_name = models.CharField(verbose_name='Имя', max_length=40)
    last_name = models.CharField(verbose_name='Фамилия', max_length=40)
    email = models.CharField(max_length=50)
    password = models.CharField(verbose_name='Пароль', max_length=100)
    created = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)

    is_staff = models.BooleanField(verbose_name='Является администратором', default=False)
    is_active = models.BooleanField(verbose_name='Активный', default=True)
    is_superuser = models.BooleanField(default=False)

    class Meta:
        ordering = ['id', 'username', 'first_name', 'last_name']
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Список пользователей'


def user_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid4().hex[:8]}.{ext}'
    return os.path.join('storage_files', instance.user.username, filename)


class Files(models.Model):
    title = models.CharField(verbose_name='Название файла', max_length=100)
    comment = models.CharField(verbose_name='Комментарий', max_length=250, default='', blank=True)
    size = models.IntegerField(verbose_name='Размер файла', default=0)
    created = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    last_download = models.DateTimeField(verbose_name='Дата последнего скачивания', null=True)
    user = models.ForeignKey(Users, verbose_name='Пользователь', default=1, on_delete=models.CASCADE)
    file = models.FileField(upload_to=user_path, default='')

    class Meta:
        ordering = ['title', 'created']
        verbose_name = 'Файл'
        verbose_name_plural = 'Список файлов'