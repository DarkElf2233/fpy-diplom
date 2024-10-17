from storage.models import Users, Files
from rest_framework import serializers


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = '__all__'
