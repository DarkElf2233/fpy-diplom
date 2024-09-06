from rest_framework import status
from django.http import Http404
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.views import APIView

import re

from storage.models import Users, Files
from storage.serializers import FilesSerializer, UsersSerializer, ErrorSerializer


### Users ###

class UsersList(APIView):
    """
    List all users, or create a new user.
    """
    def get(self, request, format=None):
        users = Users.objects.all()
        serializer = UsersSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        if request.data['create']:
            username = request.data['username']
            
            message = {}
            # Validate username
            if not username.isalpha() and not username.isdigit():
                message['message'] = 'Логин должен состоять только из букв и цифр.'
                error_serializer = ErrorSerializer(message)
                return Response(error_serializer.data, status=status.HTTP_400_BAD_REQUEST)

            if not username[0].isalpha():
                message['message'] = 'Первым символом логина должна быть буква.'
                error_serializer = ErrorSerializer(message)
                return Response(error_serializer.data, status=status.HTTP_400_BAD_REQUEST)

            if len(username) < 4 or len(username) > 20:
                message['message'] = 'Длина логина должна быть не меньше 4 и не больше 20.'
                return Response(error_serializer.data, status=status.HTTP_400_BAD_REQUEST)

            password = request.data['password']
            # Validate password
            if len(password) < 6:
                message['message'] = 'Пароль слишком короткий.'
                error_serializer = ErrorSerializer(message)
                return Response(error_serializer.data, status=status.HTTP_400_BAD_REQUEST)

            match_letters = re.search(r'[a-zA-Z]+', password)
            match_numbers = re.search(r'[0-9]+', password)
            match_symbols = re.search(r'[@_!#$%^&*()<>?/\|}{~:]+', password)
            if not match_letters or not match_numbers or not match_symbols:
                message['message'] = 'В пароле должна быть хотя бы одна буква, одна цифра и один специальный символ.'
                error_serializer = ErrorSerializer(message)
                return Response(error_serializer.data, status=status.HTTP_400_BAD_REQUEST)

            # Adding user role
            request.data['role'] = 'USER'
            # Hashing password
            request.data['password'] = make_password(request.data['password'])

            user_serializer = UsersSerializer(data=request.data)
            if user_serializer.is_valid():
                user_serializer.save()
                return Response(user_serializer.data, status=status.HTTP_201_CREATED)
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Try to find user by username
            try:
                user = Users.objects.get(username=request.data['username'])
            except Users.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            # Match passwords
            if user.password != make_password(request.data['password']):
                return Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_200_OK)


# FOR BACKEND ONLY
class UserDetail(APIView):
    """
    Retrieve, update or delete a user.
    """
    def get_object(self, pk):
        try:
            return Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UsersSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UsersSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

### Files ###

class FilesList(APIView):
    """
    List all files, or create a new file.
    """
    def get(self, request, format=None):
        files = Files.objects.all()
        serializer = FilesSerializer(files, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FilesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FileDetail(APIView):
    """
    Retrieve, update or delete a file.
    """
    def get_object(self, pk):
        try:
            return Files.objects.get(pk=pk)
        except Files.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        file = self.get_object(pk)
        serializer = FilesSerializer(file)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        file = self.get_object(pk)
        serializer = FilesSerializer(file, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        file = self.get_object(pk)
        file.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
