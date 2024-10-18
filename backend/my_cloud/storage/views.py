from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.http import Http404, JsonResponse

from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

import json

import datetime
import os
from uuid import uuid4

from storage.models import Users, Files
from storage.serializers import FilesSerializer, UsersSerializer
from storage.validations import validate_password, validate_username, validate_file_size


### Users ###

# Django Auth
def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response

@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    
    user = authenticate(username=username, password=password)
    if user is None:
        return JsonResponse({
            'message': 'Неправильное имя пользователя или пароль.'
        }, status=status.HTTP_400_BAD_REQUEST)

    login(request, user)
    return JsonResponse({'message': 'Успешная авторизация.'})

@login_required
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Успешный выход.'})

@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})
    return JsonResponse({'isAuthenticated': True})

@login_required
def user_info(request):
    return JsonResponse({
        'username': request.user.username,
        'id': request.user.id
    })


class UsersRegister(APIView):
    """
    Create a new user.
    """
    permission_classes = [AllowAny]
    def post(self, request):
        data = {}
        # Validata username
        data = validate_username(request.data['username'])
        if data != True:
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

        # Validate password
        data = validate_password(request.data['password'])
        if data != True:
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

        # Hashing password
        request.data['password'] = make_password(request.data['password'])

        user_serializer = UsersSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsersList(APIView):
    """
    List all users.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, format=None):
        users = Users.objects.all()
        user_serializer = UsersSerializer(users, many=True)
        return Response(user_serializer.data)  


class UserDetail(APIView):
    """
    Retrieve, update or delete a user.
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        user_serializer = UsersSerializer(user)
        return Response(user_serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        user_serializer = UsersSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


### Files ###

class FilesList(APIView):
    """
    List all files, or create a new file.
    """
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, format=None):
        user_id = request.GET.get('pk', None)
        if user_id == None:
            user = Users.objects.get(id=request.user.id)
            if user.is_staff:
                files = Files.objects.all()
                file_serializer = FilesSerializer(files, many=True)
                return Response(file_serializer.data, status=status.HTTP_200_OK)
            return Response({ 'details': 'Нет доступа.' }, status=status.HTTP_403_FORBIDDEN)

        files = Files.objects.filter(user=user_id)
        file_serializer = FilesSerializer(files, many=True)
        return Response(file_serializer.data)

    def post(self, request, format=None):
        data = validate_file_size(request.data['size'])
        if data != True:
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

        file_serializer = FilesSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FileDetail(APIView):
    """
    Retrieve, update or delete a file.
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Files.objects.get(pk=pk)
        except Files.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        is_download = request.GET.get('download', None)
        is_special = request.GET.get('special', None)

        file = self.get_object(pk)
        if is_download:
            file.last_download = datetime.datetime.now()
            file.save()
            url = serve_download_file(request, pk)
            return Response(url)

        if is_special:
            url = serve_special_file(request, pk)
            return Response(url)

        files_serializer = FilesSerializer(file)
        return Response(files_serializer.data)

    def put(self, request, pk, format=None):
        file = self.get_object(pk)
        files_serializer = FilesSerializer(file, data=request.data)
        if files_serializer.is_valid():
            files_serializer.save()
            return Response(files_serializer.data)
        return Response(files_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        file = self.get_object(pk)
        file.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def serve_special_file(request, pk):
    file = Files.objects.get(id=pk)

    temporary_filename = f'temp_{file.pk}_{uuid4().hex[:8]}.{file.file.name.split(".")[-1]}'
    temporary_path = os.path.join(settings.MEDIA_ROOT, temporary_filename)

    with open(temporary_path, 'wb+') as temp_file:
        for chunk in file.file.open():
            temp_file.write(chunk)

    special_url = 'http://' + request.get_host() + settings.MEDIA_URL + temporary_filename
    return {
        'special_url': special_url
    }


def serve_download_file(request, pk):
    file = Files.objects.get(id=pk)
    
    download_url = 'http://' + request.get_host() + settings.MEDIA_URL + file.file.name
    return {
        'download_url': download_url,
        'filename': file.title
    }
