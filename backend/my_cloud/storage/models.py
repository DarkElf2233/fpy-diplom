from django.db import models


class Users(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=100)
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=10)

    class Meta:
        ordering = ['full_name']
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class Files(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    user = models.ForeignKey(Users, default=1, on_delete=models.CASCADE)
   
    class Meta:
        ordering = ['created']
        verbose_name = 'File'
        verbose_name_plural = 'Files'
