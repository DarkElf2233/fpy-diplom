from django.db import models


class Files(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    path_to_file = models.CharField(max_length=250)
    
    class Meta:
        ordering = ['created']


class Users(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=100)
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=10)
    path_to_user = models.CharField(max_length=250)
    
    class Meta:
        ordering = ['full_name']
