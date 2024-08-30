from storage.models import User, File
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'full_name', 'email', 'password', 'role', 'path']


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['url', 'name']