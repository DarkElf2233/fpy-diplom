from storage.models import Users, Files
from rest_framework import serializers


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'full_name', 'email', 'password', 'role']


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ['id', 'title', 'comment', 'size', 'created', 'last_download', 'user']


class ErrorSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)
